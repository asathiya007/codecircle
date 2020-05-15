import {
    GET_CHATS, 
    CHAT_ERROR,
    CREATE_CHAT
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
        case CREATE_CHAT:
            if (payload[0]) {
                return {
                  ...state,
                  chat: payload[0],
                  chats: [payload[0], ...state.chats],
                  error: {},
                  loading: false,
                };
            }
            return state;
        default: 
            return state; 
    }
}