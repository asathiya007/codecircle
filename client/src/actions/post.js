import axios from 'axios';
import {setAlert} from './alert';
import {
    GET_POSTS, 
    POST_ERROR, 
    ADD_POST,
    UPDATE_REACTS,
    DELETE_POST
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
        // send error data to the store 
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
        // send error data to store (post) 
        dispatch({
            type: POST_ERROR, 
            payload: {msg: 'Error in deleting post'}
        }); 
    }
}