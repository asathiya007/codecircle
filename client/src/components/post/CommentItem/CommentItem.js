import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { likeComment, loveComment, laughComment, deleteComment } from '../../../actions/post';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';
import Spinner from '../../layout/Spinner/Spinner';
import Button from 'react-bootstrap/Button';

const CommentItem = (
    {
        comment,
        postId,
        auth,
        likeComment,
        loveComment,
        laughComment,
        deleteComment,
        showActions,
        history
    }
) => {
    const [fileData, setFileData] = useState({});
    const [isImage, toggleIsImage] = useState(false);
    const [isVideo, toggleIsVideo] = useState(false);

    const disableButtons = () => {
        if (document.querySelector('#likeButton' + comment._id)) {
            document.querySelector('#likeButton' + comment._id).setAttribute('disabled', true);
        }
        if (document.querySelector('#loveButton' + comment._id)) {
            document.querySelector('#loveButton' + comment._id).setAttribute('disabled', true);
        }
        if (document.querySelector('#laughButton' + comment._id)) {
            document.querySelector('#laughButton' + comment._id).setAttribute('disabled', true);
        }
        if (document.querySelector('#deleteButton' + comment._id)) {
            document.querySelector('#deleteButton' + comment._id).setAttribute('disabled', true);
        }
    }; 

    const enableButtons = () => {
        if (document.querySelector('#likeButton' + comment._id)) {
            document.querySelector('#likeButton' + comment._id).removeAttribute('disabled');
        }
        if (document.querySelector('#loveButton' + comment._id)) {
            document.querySelector('#loveButton' + comment._id).removeAttribute('disabled');
        }
        if (document.querySelector('#laughButton' + comment._id)) {
            document.querySelector('#laughButton' + comment._id).removeAttribute('disabled');
        }
        if (document.querySelector('#deleteButton' + comment._id)) {
            document.querySelector('#deleteButton' + comment._id).removeAttribute('disabled');
        }
    };

    useEffect(() => {
        const processFile = async () => {
            if (comment.file) {
                const res = await axios.get(`/api/posts/displayfile/${comment.file}`);
                if (res.data.mimetype.toString().includes('image')) {
                    const { mimetype, data } = res.data;
                    const newData = new Buffer(data).toString('base64');
                    setFileData({ data: newData, mimetype });
                    toggleIsImage(true);
                } else if (res.data.mimetype.toString().includes('video') || res.data.mimetype.toString().includes('mp4')) {
                    const { mimetype, data } = res.data;
                    const newData = new Buffer(data).toString('base64');
                    setFileData({ data: newData, mimetype });
                    toggleIsVideo(true);
                }
            }
        }

        processFile();
    }, [comment.file]);

    return auth.loading || !comment ? <Spinner /> : (
        <Jumbotron className="comment">
            <div>
                <Link to={`/profiles/${comment.user}`}>
                    <Image roundedCircle src={comment.avatar} className="w-70" />
                </Link>
                <p className="f4 fw4 text-primary mt1 mb0 p-hover" onClick={e => {
                    e.preventDefault();
                    history.push(`/profiles/${comment.user}`);
                }}>
                    {comment.name}
                </p>
                <p className="f6 fw4">
                    <Moment fromNow>
                        {comment.date}
                    </Moment>
                </p>
            </div>
            <div>
                <p className="f4 mb2">
                    {comment.text}
                </p>
                
                {
                    isImage && (
                        <Image src={`data:${fileData.mimetype};base64,${fileData.data}`} alt='user file' className="w-60" id={'userFile' + comment._id} />
                    )
                }
                {
                    isVideo && (
                        <video src={`data:${fileData.mimetype};base64,${fileData.data}`} alt='user file' className="w-60" autoPlay controls muted loop id={'userFile' + comment._id}/>
                    )
                }
                {
                    showActions && (
                        <div className="mt2">
                            <hr className="hr-dark" />
                            <Button variant="success" className="mr1 button-margins" id={'likeButton' + comment._id} onClick={e => {
                                e.preventDefault();
                                likeComment(postId, comment._id);
                            }}>
                                <i className="fas fa-thumbs-up fa-2x"></i>
                                {
                                    comment.likes.length > 0 && (
                                        <span>{' ' + comment.likes.length}</span>
                                    )
                                }
                            </Button>
                            <Button variant="danger" className="mh1 button-margins" id={'loveButton' + comment._id} onClick={e => {
                                e.preventDefault();
                                loveComment(postId, comment._id);
                            }}>
                                <i className="fas fa-heart fa-2x"></i>
                                {
                                    comment.loves.length > 0 && (
                                        <span>{' ' + comment.loves.length}</span>
                                    )
                                }
                            </Button>
                            <Button variant="warning" className="mh1 button-margins" id={'laughButton' + comment._id} onClick={e => {
                                e.preventDefault();
                                laughComment(postId, comment._id);
                            }}>
                                <i className="fas fa-laugh-beam fa-2x text-white"></i>
                                {
                                    comment.laughs.length > 0 && (
                                        <span className="text-white">{' ' + comment.laughs.length}</span>
                                    )
                                }
                            </Button>
                            {
                                comment.user === auth.user._id && (
                                    <Button variant="danger" className="mh1 button-margins" id={'deleteButton' + comment._id} onClick={async e => {
                                        e.preventDefault();
                                        disableButtons(); 
                                        // await deleteComment(postId, comment._id);
                                        setTimeout(() => {
                                            enableButtons();
                                        }, 3000);
                                        // enableButtons();
                                    }}>
                                        <i className="fas fa-times fa-2x"></i>
                                    </Button>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </Jumbotron>
    )
}

CommentItem.defaultProps = {
    showActions: true
}

CommentItem.propTypes = {
    auth: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    likeComment: PropTypes.func.isRequired,
    loveComment: PropTypes.func.isRequired,
    laughComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { likeComment, loveComment, laughComment, deleteComment })(withRouter(CommentItem)); 
