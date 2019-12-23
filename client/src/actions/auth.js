import axios from 'axios';
import {
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED, 
    AUTH_ERROR, 
    LOGOUT
} from './types';
import setAuthToken from '../utils/setAuthToken';
import {setAlert} from './alert';

export const loadUser = () => async dispatch => {
    // set/clear the axios token header 
    setAuthToken(localStorage.token);

    try {
        // if current user token exists, load current user data 
        if (localStorage.token) {
            const res = await axios.get('/api/users/me');
            dispatch({
                type: USER_LOADED, 
                payload: res.data
            }); 
        }
    } catch (error) {
        // clear user data in store (auth)
        dispatch({
            type: AUTH_ERROR
        }); 
    }
}

export const register = ({name, email, password}) => async dispatch => {
    try {
        // create new user 
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({name, email, password});
        const res = await axios.post('api/users', body, config); 

        // send token to store 
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }); 

        // load user data in store
        dispatch(loadUser());
    } catch (error) {
        // create an alert for each error
        const errors = error.response.data.errors; 
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        // clear user data in store (auth)
        dispatch({
            type: REGISTER_FAIL
        }); 
    }
}

export const login = ({ email, password }) => async dispatch => {
    try {
        // authenticate user 
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ email, password });
        const res = await axios.post('api/auth', body, config);

        // send token to store 
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        // load user data in store 
        dispatch(loadUser());
    } catch (error) {
        // create an alert for each error 
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        // clear user data in store (auth)
        dispatch({
            type: LOGIN_FAIL
        });
    }
}

export const logout = () => dispatch => {
    // clear user data in store (auth)
    dispatch({
        type: LOGOUT
    }); 
}