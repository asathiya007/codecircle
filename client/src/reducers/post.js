import {
    GET_POSTS, 
    POST_ERROR, 
    ADD_POST, 
    DELETE_POST,
    UPDATE_REACTS
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
                error: {},
                loading: false 
            }
        case POST_ERROR: 
            return {
                ...state, 
                error: payload, 
                loading: false
            }
        case ADD_POST: 
            return {
                ...state, 
                posts: [payload, ...state.posts], 
                error: {}, 
                loading: false
            }
        case DELETE_POST: 
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload), 
                error: {}, 
                loading: false
            }
        case UPDATE_REACTS:
            return {
                ...state, 
                posts: state.posts
                    .map(post => post._id === payload.postId ? {
                        ...post, likes: payload.likes
                    } : post)
                    .map(post => post._id === payload.postId ? {
                        ...post, loves: payload.loves
                    } : post)
                    .map(post => post._id === payload.postId ? {
                        ...post, laughs: payload.laughs
                    } : post),
                error: {},
                loading: false
            }
        default: 
            return state; 
    }
}