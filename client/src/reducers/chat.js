import {
    GET_CHATS, 
    CHAT_ERROR
} from '../actions/types';

const initialState = {
    chats: [],
    chat: null, 
    loading: true,
    error: {}
}; 

export default function(state = initialState, action) {
    const {type, payload} = action; 

    switch(type) {
        case GET_CHATS:
            return {
                ...state, 
                chats: payload,
                error: {},
                loading: false
            }
        case CHAT_ERROR: 
            return {
                ...initialState, 
                error: payload
            }
        default: 
            return state; 
    }
}