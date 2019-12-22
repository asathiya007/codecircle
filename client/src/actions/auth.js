import axios from 'axios';
import {
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    USER_LOADED, 
    AUTH_ERROR
} from './types';
import setAuthToken from '../utils/setAuthToken';
import {setAlert} from './alert';

export const loadUser = () => async dispatch => {
    setAuthToken(localStorage.token);

    try {
        if (localStorage.token) {
            const res = await axios.get('/api/users/me');
            dispatch({
                type: USER_LOADED, 
                payload: res.data
            }); 
        }
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        }); 
    }
}

export const register = ({name, email, password}) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({name, email, password});
        const res = await axios.post('api/users', body, config); 

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }); 

        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors; 
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: REGISTER_FAIL
        }); 
    }
}