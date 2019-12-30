import {
    GET_PROFILE,
    GET_PROFILES, 
    UPDATE_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    DELETE_ACCOUNT,
    GET_REPOS
} from '../actions/types';

const initialState = {
    profile: null, 
    profiles: [],
    repos: [],
    loading: true, 
    error: {}
}

export default function(state = initialState, action) {
    const {type, payload} = action; 

    switch(type) {
        case GET_PROFILE: 
        case UPDATE_PROFILE: 
            return {
                ...state, 
                profile: payload, 
                loading: false, 
                error: {}
            }
        case GET_PROFILES: 
            return {
                ...state, 
                profiles: payload,
                loading: false,
                error: {}
            }
        case CLEAR_PROFILE: 
        case DELETE_ACCOUNT: 
            return {
                ...state,
                profile: null,
                repos: [], 
                loading: false,
                error: {},
                profiles: []
            }
        case PROFILE_ERROR: 
            return {
                ...state,
                profile: null, 
                loading: false, 
                error: payload,
                repos: [],
                profiles: []
            }
        case GET_REPOS: 
            return {
                ...state, 
                loading: false, 
                repos: payload, 
                error: {}, 
                profiles: []
            }
        default: 
            return state; 
    }
}
