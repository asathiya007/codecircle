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

const PostItem = (
    {
        post, 
        auth, 
        likePost, 
        lovePost, 
        laughPost, 
        deletePost, 
        showActions, 
        history
    }
) => {
    const [fileData, setFileData] = useState({});
    const [isImage, toggleIsImage] = useState(false);

    useEffect(() => {
        const processFile = async () => {
            if (post.file) {
                const res = await axios.get(`/api/posts/displayfile/${post.file}`); 
                if (res.data.mimetype.toString().includes('image')) {
                    const {mimetype, data} = res.data; 
                    const newData = new Buffer(data).toString('base64');
                    setFileData({data: newData, mimetype});
                    toggleIsImage(true);
                }
            }
        }

        processFile(); 
    }, [post.file]);

    return post.loading || auth.loading ? <Spinner/> : (
        <Jumbotron className="post">
            <div>
                <Link to={`/profiles/${post.user}`}>
                    <Image roundedCircle src={auth.user.avatar} className="w-70"/>
                </Link>
                <p className="f4 fw4 text-primary mt1 mb0 p-hover" onClick={e => {
                    e.preventDefault();
                    history.push(`/profiles/${post.user}`); 
                }}>
                    {auth.user.name}
                </p>
                <p className="f6 fw4">
                    <Moment format="YYYY/MM/DD">
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
                        <Image src={`data:${fileData.mimetype};base64,${fileData.data}`} alt='user file' className="w-50" />
                    )
                }
                {
                    showActions && (
                        <div className="mt2">
                            <hr className="hr-dark"/>
                            <Button variant="success" className="mr1" onClick={e => {
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
                            <Button variant="danger" className="mh1" onClick={e => {
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
                            <Button variant="warning" className="mh1" onClick={e => {
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
                            <Button href={`/posts/${post._id}`} variant="primary" className="mh1">
                                <i className="fas fa-comments fa-2x"></i>
                                {
                                    post.comments.length > 0 && (
                                        <span>{' ' + post.comments.length}</span>
                                    )
                                }
                            </Button>
                            <Button variant="danger" className="mh1" onClick={e => {
                                e.preventDefault(); 
                                deletePost(post._id); 
                            }}>
                                <i className="fas fa-times fa-2x"></i>
                            </Button>
                        </div>
                    )
                }
            </div>
        </Jumbotron>
    )
}

PostItem.defaultProps = {
    showActions: true
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
