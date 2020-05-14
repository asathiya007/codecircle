import axios from 'axios';
import {setAlert} from './alert';
import {
    GET_POSTS,
    GET_POST, 
    POST_ERROR, 
    ADD_POST,
    UPDATE_REACTS,
    DELETE_POST,
    ADD_COMMENT, 
    DELETE_COMMENT,
    UPDATE_COMMENT_REACTS
} from './types';

export const getPosts = () => async dispatch => {
    try {
        // get all posts from all users 
        const res = await axios.get('/api/posts');

        // send all posts to the store (post)
        dispatch({
            type: GET_POSTS, 
            payload: res.data
        }); 
    } catch (error) {
        // send error data to the store (post)
        dispatch({
            type: POST_ERROR, 
            payload: {
                msg: 'Error in getting all posts from all users'
            }
        }); 
    }
}

export const getPost = id => async dispatch => {
    try {
        // get post data
        const res = await axios.get(`/api/posts/${id}`); 
        console.log(res.data);

        // send post data to the store (post)
        dispatch({
            type: GET_POST, 
            payload: res.data
        }); 
    } catch (error) {
        // send error data to the store (post)
        dispatch({
            type: POST_ERROR,
            payload: { msg: 'Error in getting post data' }
        }); 
    }
}

export const addPost = (formData) => async dispatch => {
    try {
        // add a post 
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/posts', formData, config);

        // send the new post data to the store (post)
        dispatch({
            type: ADD_POST, 
            payload: res.data
        }); 

        // alert the user of added post 
        dispatch(setAlert('Added post', 'success')); 
    } catch (error) {
        // alert the user that there has been an error
        if (error.response && error.response.status === 503) {
            dispatch(setAlert('Unable to make post, please provide less text and/or a smaller image/video file', 'danger'));
        } else {
            dispatch(setAlert('Unable to make post, please try again later', 'danger'));
        }

        // send error data to the store (post)
        dispatch({
            type: POST_ERROR, 
            payload: {msg: 'Error in adding new post'}
        }); 
    }
}

export const likePost = (postId) => async dispatch => {
    try {
        // like post
        const res = await axios.put(`/api/posts/like/${postId}`);

        // send updated post reacts data to store (post)
        dispatch({
            type: UPDATE_REACTS, 
            payload: {
                postId, 
                likes: res.data.likes, 
                loves: res.data.loves, 
                laughs: res.data.laughs
            }
        }); 
    } catch (error) {
        // send error data to store (post)
        dispatch({
            type: POST_ERROR, 
            payload: {msg: 'Error in liking post'}
        }); 
    }
}

export const lovePost = (postId) => async dispatch => {
    try {
        // love post
        const res = await axios.put(`/api/posts/love/${postId}`);

        // send updated post reacts data to store (post)
        dispatch({
            type: UPDATE_REACTS,
            payload: {
                postId,
                likes: res.data.likes,
                loves: res.data.loves,
                laughs: res.data.laughs
            }
        });
    } catch (error) {
        // send error data to store (post)
        dispatch({
            type: POST_ERROR,
            payload: { msg: 'Error in loving post' }
        });
    }
}

export const laughPost = (postId) => async dispatch => {
    try {
        // laugh post
        const res = await axios.put(`/api/posts/laugh/${postId}`);

        // send updated post reacts data to store (post)
        dispatch({
            type: UPDATE_REACTS,
            payload: {
                postId,
                likes: res.data.likes,
                loves: res.data.loves,
                laughs: res.data.laughs
            }
        });
    } catch (error) {
        // send error data to store (post)
        dispatch({
            type: POST_ERROR,
            payload: { msg: 'Error in laughing at post' }
        });
    }
}

export const deletePost = (postId) => async dispatch => {
    try {
        // delete post 
        await axios.delete(`/api/posts/${postId}`); 

        // send id of post to remove to filter posts in store (post)
        dispatch({
            type: DELETE_POST, 
            payload: postId
        }); 

        // alert the user that the post has been removed 
        dispatch(setAlert('Deleted post', 'success'));
    } catch (error) {
        // alert the user that there has been an error
        dispatch(setAlert('Unable to delete post, please try again later', 'danger'));

        // send error data to store (post) 
        dispatch({
            type: POST_ERROR, 
            payload: {msg: 'Error in deleting post'}
        }); 
    }
}

export const addComment = (postId, formData) => async dispatch => {
    try {
        // add comment
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);

        // send comment data to store (post)
        dispatch({
            type: ADD_COMMENT, 
            payload: {postId, comments: res.data} 
        }); 

        // alert user that comment has been added 
        dispatch(setAlert('Added comment to post', 'success'));
    } catch (error) {
        // alert the user that there has been an error
        if (error.response && error.response.status === 503) {
            dispatch(setAlert('Unable to make comment, please provide less text and/or a smaller image/video file', 'danger'));
        } else {
            dispatch(setAlert('Unable to make comment, please try again later', 'danger'));
        }

        // send error data to store (post)
        dispatch({
            type: POST_ERROR,
            payload: {msg: 'Error in adding comment to post'}
        }); 
    }
}

export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        // delete the comment 
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`); 

        // send updated comments data and post id to store (post)
        dispatch({
            type: DELETE_COMMENT, 
            payload: {postId, comments: res.data}
        }); 

        // alert the user that a comment has been deleted
        dispatch(setAlert('Deleted comment from post', 'success'));
    } catch (error) {
        // alert the user that there has been an error
        dispatch(setAlert('Unable to delete comment, please try again later', 'danger'));

        // send error data to store (post)
        dispatch({
            type: POST_ERROR,
            payload: { msg: 'Error in adding comment to post' }
        });
    }
}

export const likeComment = (postId, commentId) => async dispatch => {
    try {
        // like the comment 
        const res = await axios.put(`/api/posts/comment/like/${postId}/${commentId}`); 

        // send updated comment data to store (post)
        dispatch({
            type: UPDATE_COMMENT_REACTS,
            payload: {
                postId, 
                commentId,
                likes: res.data.likes, 
                loves: res.data.loves, 
                laughs: res.data.laughs
            }
        }); 
    } catch (error) {
        // send error data to store (post)
        dispatch({
            type: POST_ERROR,
            payload: { msg: 'Error in liking comment' }
        });
    }
}

export const loveComment = (postId, commentId) => async dispatch => {
    try {
        // love the comment 
        const res = await axios.put(`/api/posts/comment/love/${postId}/${commentId}`);

        // send updated comment data to store (post)
        dispatch({
            type: UPDATE_COMMENT_REACTS,
            payload: {
                postId,
                commentId,
                likes: res.data.likes,
                loves: res.data.loves,
                laughs: res.data.laughs
            }
        });
    } catch (error) {
        // send error data to store (post)
        dispatch({
            type: POST_ERROR,
            payload: { msg: 'Error in loving comment' }
        });
    }
}

export const laughComment = (postId, commentId) => async dispatch => {
    try {
        // laugh at the comment 
        const res = await axios.put(`/api/posts/comment/laugh/${postId}/${commentId}`);

        // send updated comment data to store (post)
        dispatch({
            type: UPDATE_COMMENT_REACTS,
            payload: {
                postId,
                commentId,
                likes: res.data.likes,
                loves: res.data.loves,
                laughs: res.data.laughs
            }
        });
    } catch (error) {
        // send error data to store (post)
        dispatch({
            type: POST_ERROR,
            payload: { msg: 'Error in laughing at comment' }
        });
    }
}