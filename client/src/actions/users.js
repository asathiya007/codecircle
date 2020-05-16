import axios from 'axios';
import {
    GET_USERS, 
    USERS_ERROR
} from './types';

export const getUsers = () => async dispatch => {
    try {
        // get all users that are not the current one 
        const res = await axios.get('/api/users');

        // send all users data to store 
        dispatch({
            type: GET_USERS, 
            payload: res.data
        }); 
    } catch (error) {
        // send error data to store 
        dispatch({
            type: USERS_ERROR,
            payload: {
                msg: 'Error in getting all users data'
            }
        }); 
    }
}