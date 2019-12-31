import axios from 'axios';
import {setAlert} from './alert';
import {
    GET_POSTS, 
    POST_ERROR, 
    ADD_POST
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