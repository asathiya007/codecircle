import axios from 'axios';
import {setAlert} from './alert';
import {
    GET_POSTS, 
    POST_ERROR
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