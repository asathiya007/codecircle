import axios from 'axios';
import {
    GET_CHATS,
    CHAT_ERROR,
    CREATE_CHAT, 
    LEAVE_CHAT
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

export const createChat = (formData) => async dispatch => {
    try {
        // create a new chat 
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await axios.post('/api/chats', formData, config);
        
        // send chats data to store 
        dispatch({
            type: CREATE_CHAT, 
            payload: res.data
        }); 
    } catch (error) {
        // send error data to store 
        dispatch({
            type: CHAT_ERROR,
            payload: {
                msg: 'Error in creating new chat'
            }
        }); 
    }
}

export const leaveChat = (id) => async dispatch => {
    try {
        // delete the chat 
        const res = await axios.delete(`/api/chats/${id}`);

        dispatch({
            type: LEAVE_CHAT, 
            payload: res.data
        }); 
    } catch (error) {
        dispatch({
            type: CHAT_ERROR, 
            payload: {
                msg: 'Error in leaving chat'
            }
        }); 
    }
}