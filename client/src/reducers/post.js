import {
    GET_POSTS, 
    POST_ERROR
} from '../actions/types';

const initialState = {
    posts: [],
    post: null, 
    loading: true, 
    error: {}
}

export default function(state = initialState, action) {
    const {type, payload} = action; 

    switch(type) {
        case GET_POSTS: 
            return {
                ...state, 
                posts: payload, 
                post: null, 
                loading: false 
            }
        case POST_ERROR: 
            return {
                ...state, 
                posts: [],
                post: null, 
                error: payload, 
                loading: false
            }
        default: 
            return state; 
    }
}