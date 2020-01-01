import React, {Fragment, useEffect, useState} from 'react'; 
import PropTypes from 'prop-types'; 
import {connect} from 'react-redux';
import {likePost, lovePost, laughPost, deletePost} from '../../../actions/post';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';
import Spinner from '../../layout/Spinner/Spinner';

const PostItem = (
    {
        post, 
        auth, 
        likePost, 
        lovePost, 
        laughPost, 
        deletePost, 
        showActions
    }
) => {
    const [fileData, setFileData] = useState({});
    const [isImage, toggleIsImage] = useState(false);

    return post.loading || auth.loading ? <Spinner/> : (
        <Jumbotron className="post">
            <div>
                <Link to={`/profiles/${post.user}`}>
                    <Image roundedCircle src={auth.user.avatar}/>
                </Link>
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

export default connect(mapStateToProps, {likePost, lovePost, laughPost, deletePost})(PostItem); 
