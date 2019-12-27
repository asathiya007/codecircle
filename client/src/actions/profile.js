import axios from 'axios';
import {
    GET_PROFILE,
    UPDATE_PROFILE,
    PROFILE_ERROR, 
    CLEAR_PROFILE
} from './types';
import {setAlert} from './alert';

export const getProfile = () => async dispatch => {
    try {
        // get current use profile data and send to store (profile)
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE, 
            payload: res.data
        }); 
    } catch (error) {
        dispatch({type: CLEAR_PROFILE});
        dispatch({
            type: PROFILE_ERROR, 
            payload: {msg: 'Error in obtaining current user profile data'}
        }); 
    }
}

// create or update current user profile 
export const buildProfile = (formData, history, edit = false) => async dispatch => {
    try {
        // create/update current user profile with new data 
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post('/api/profile', formData, config);

        // send new profile data to store (profile)
        dispatch({
            type: UPDATE_PROFILE, 
            payload: res.data
        }); 

        // create alert to notify user of profile update
        dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));

        // redirect to dashboard 
        history.push('/dashboard');
    } catch (error) {
        // create an alert for each error  
        const errors = error.response.data.errors; 
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger'))); 
        }

        // clear user profile data (profile)
        dispatch({
            type: PROFILE_ERROR, 
            payload: {msg: 'Error in creating/updating user profile data'}
        }); 
    }
}

// add profile education 
export const addEducation = (formData, history) => async dispatch => {
    try {
        // update user profile with new education data  
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/education', formData, config);

        // send new profile data to store (profile)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        }); 

        // create alert to notify user of profile update
        dispatch(setAlert('Education credential added', 'success'));

        // redirect to dashboard 
        history.push('/dashboard');
    } catch (error) {
        // create an alert for each error  
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        // clear user profile data (profile)
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: 'Error in creating/updating user profile data' }
        }); 
    }
}