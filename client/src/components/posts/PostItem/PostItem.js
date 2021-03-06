import React, {useEffect, useState} from 'react'; 
import PropTypes from 'prop-types'; 
import {connect} from 'react-redux';
import {likePost, lovePost, laughPost, deletePost} from '../../../actions/post';
import {Link, withRouter} from 'react-router-dom';
import Moment from 'react-moment';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';
import Spinner from '../../layout/Spinner/Spinner';
import Button from 'react-bootstrap/Button';
import { setAlert } from '../../../actions/alert';

const PostItem = (
    {
        post, 
        auth, 
        likePost, 
        lovePost, 
        laughPost, 
        deletePost, 
        showActions,
        showComment,  
        history
    }
) => {
    const [fileData, setFileData] = useState({});
    const [isImage, toggleIsImage] = useState(false);
    const [isVideo, toggleIsVideo] = useState(false);

    const disableButtons = () => {
        if (document.querySelector('#likeButton' + post._id)) {
            document.querySelector('#likeButton' + post._id).setAttribute('disabled', true);
        }
        if (document.querySelector('#loveButton' + post._id)) {
            document.querySelector('#loveButton' + post._id).setAttribute('disabled', true);
        }
        if (document.querySelector('#laughButton' + post._id)) {
            document.querySelector('#laughButton' + post._id).setAttribute('disabled', true);
        }
        if (document.querySelector('#commentButton' + post._id)) {
            document.querySelector('#commentButton' + post._id).setAttribute('disabled', true);
        }
        if (document.querySelector('#deleteButton' + post._id)) {
            document.querySelector('#deleteButton' + post._id).setAttribute('disabled', true); 
        }
    } 

    const enableButtons = () => {
        if (document.querySelector('#likeButton' + post._id)) {
            document.querySelector('#likeButton' + post._id).removeAttribute('disabled');
        }
        if (document.querySelector('#loveButton' + post._id)) {
            document.querySelector('#loveButton' + post._id).removeAttribute('disabled');
        }
        if (document.querySelector('#laughButton' + post._id)) {
            document.querySelector('#laughButton' + post._id).removeAttribute('disabled');
        }
        if (document.querySelector('#commentButton' + post._id)) {
            document.querySelector('#commentButton' + post._id).removeAttribute('disabled');
        }
        if (document.querySelector('#deleteButton' + post._id)) {
            document.querySelector('#deleteButton' + post._id).removeAttribute('disabled');
        }
    }

    useEffect(() => {
        const processFile = async () => {
            if (post.file) {
                try {
                    const res = await axios.get(`/api/posts/displayfile/${post.file}`);
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
                } catch (error) {
                    if (error.response && error.response.status === 503) {
                        setAlert('Unable to display image/video file, size too large', 'danger');
                    } else {
                        setAlert('Unable to display image/video file, please try again later', 'danger');
                    }
                }
            }
        }

        processFile(); 
    }, [post.file]);

    return !post || (post.loading || auth.loading) ? <Spinner/> : (
        <Jumbotron className="post">
            <div>
                <Link to={`/profiles/${post.user}`}>
                    <Image roundedCircle src={post.avatar} className="w-70"/>
                </Link>
                <p className="f4 fw4 text-primary mt1 mb0 p-hover" onClick={e => {
                    e.preventDefault();
                    history.push(`/profiles/${post.user}`); 
                }}>
                    {post.name}
                </p>
                <p className="f6 fw4">
                    <Moment fromNow>
                        {post.date}
                    </Moment>
                </p>
            </div>
            <div>
                <p className="f4 mb2">
                    {post.text}
                </p>
                {
                    isImage && (
                        <Image src={`data:${fileData.mimetype};base64,${fileData.data}`} alt='user file' className="w-60" id={'userFile' + post._id}/>
                    )
                }
                {
                    isVideo && (
                        <video src={`data:${fileData.mimetype};base64,${fileData.data}`} alt='user file' className="w-60" autoPlay controls muted loop id={'userFile' + post._id}/>
                    )
                }
                {
                    showActions && (
                        <div className="mt2">
                            <hr className="hr-dark"/>
                            <Button variant="success" className="mr1 button-margins" id={'likeButton' + post._id} onClick={e => {
                                e.preventDefault(); 
                                likePost(post._id); 
                            }}>
                                <i className="fas fa-thumbs-up fa-2x"></i>
                                {
                                    post.likes.length > 0 && (
                                        <span>{' ' + post.likes.length}</span>
                                    )
                                }
                            </Button>
                            <Button variant="danger" className="mh1 button-margins" id={'loveButton' + post._id} onClick={e => {
                                e.preventDefault();
                                lovePost(post._id);
                            }}>
                                <i className="fas fa-heart fa-2x"></i>
                                {
                                    post.loves.length > 0 && (
                                        <span>{' ' + post.loves.length}</span>
                                    )
                                }
                            </Button>
                            <Button variant="warning" className="mh1 button-margins" id={'laughButton' + post._id} onClick={e => {
                                e.preventDefault();
                                laughPost(post._id);
                            }}>
                                <i className="fas fa-laugh-beam fa-2x text-white"></i>
                                {
                                    post.laughs.length > 0 && (
                                        <span className="text-white">{' ' + post.laughs.length}</span>
                                    )
                                }
                            </Button>
                            {
                                showComment && (
                                    <Button onClick={e => {
                                        e.preventDefault(); 
                                        history.push(`/codeworld/${post._id}`)
                                    }} variant="primary" className="mh1 button-margins" id={'commentButton' + post._id}>
                                        <i className="fas fa-comments fa-2x"></i>
                                        {
                                            post.comments.length > 0 && (
                                                <span>{' ' + post.comments.length}</span>
                                            )
                                        }
                                    </Button>
                                )
                            }
                            {
                                post.user === auth.user._id && (
                                    <Button variant="danger" className="mh1 button-margins" id={'deleteButton' + post._id} onClick={async e => {
                                        e.preventDefault();
                                        disableButtons();
                                        await deletePost(post._id);
                                        enableButtons();
                                        history.push('/posts');
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

PostItem.defaultProps = {
    showActions: true, 
    showComment: true
}

PostItem.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    likePost: PropTypes.func.isRequired,
    lovePost: PropTypes.func.isRequired,
    laughPost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
}); 

export default connect(mapStateToProps, {likePost, lovePost, laughPost, deletePost})(withRouter(PostItem)); 
