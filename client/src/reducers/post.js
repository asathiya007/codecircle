import {
    GET_POSTS, 
    POST_ERROR, 
    ADD_POST, 
    DELETE_POST,
    UPDATE_REACTS, 
    GET_POST, 
    ADD_COMMENT, 
    DELETE_COMMENT,
    UPDATE_COMMENT_REACTS
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
        case GET_POST: 
            return {
                ...state, 
                post: payload, 
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
                post: state.post && state.post._id === payload.postId ? {
                    ...state.post, 
                    likes: payload.likes, 
                    loves: payload.loves, 
                    laughs: payload.laughs
                } : state.post, 
                error: {},
                loading: false
            }
        case ADD_COMMENT:
            return {
                ...state, 
                posts: state.posts.map(post => post._id === payload.postId ? {
                    ...post, comments: payload.comments
                } : post), 
                post: state.post && state.post._id === payload.postId ? {
                    ...state.post, comments: payload.comments
                } : state.post, 
                error: {},
                loading: false
            }
        case DELETE_COMMENT: {
            return {
                ...state, 
                posts: state.posts.map(post => post._id === payload.postId ? {
                    ...post, comments: payload.comments
                } : post), 
                post: state.post && state.post._id === payload.postId ? {
                    ...state.post, comments: payload.comments
                } : state.post, 
                error: {},
                loading: false
            }
        }
        case UPDATE_COMMENT_REACTS: 
            return {
                ...state, 
                posts: state.posts.map(post => post._id === payload.postId ? {
                    ...post, comments: post.comments.map(comment => comment._id === payload.commentId ? {
                        ...comment, likes: payload.likes, loves: payload.loves, laughs: payload.laughs
                    } : comment)
                } : post), 
                post: state.post && state.post._id === payload.postId ? {
                    ...state.post, comments: state.post.comments.map(comment => comment._id === payload.commentId ? {
                        ...comment, likes: payload.likes, loves: payload.loves, laughs: payload.laughs
                    } : comment)
                } : state.post, 
                error: {},
                loading: false
            }
        default: 
            return state; 
    }
}