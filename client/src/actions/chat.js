import axios from 'axios';
import {
    GET_CHATS,
    CHAT_ERROR
} from './types';

export const getChats = () => async dispatch => {
    try {
        // get chats data and send to store 
        const res = await axios.get('/api/chats'); 
        dispatch({
            type: GET_CHATS, 
            payload: res.data
        }); 
    } catch (error) {
        // send error data to store 
        dispatch({
            type: CHAT_ERROR,
            payload: {
                msg: 'Error in getting chats data'
            }
        }); 
    }
}