import axios from 'axios';
import {
    GET_PROFILE,
    UPDATE_PROFILE,
    PROFILE_ERROR, 
    CLEAR_PROFILE,
    GET_PROFILES
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
       // clear user profile data (profile)
        dispatch({type: CLEAR_PROFILE});
        dispatch({
            type: PROFILE_ERROR, 
            payload: {msg: 'Error in getting current user profile data'}
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
        dispatch(setAlert('Education credential added to your profile', 'success'));

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
            payload: { msg: 'Error in adding education credential to user profile' }
        }); 
    }
}

export const addExperience = (formData, history) => async dispatch => {
    try {
        // update user profile with new education data  
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience', formData, config);

        // send new profile data to store (profile)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        }); 

        // create alert to notify user of profile update
        dispatch(setAlert('Experience credential added to your profile', 'success'));

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
            payload: { msg: 'Error in adding experience credential to user profile' }
        }); 
    }
}

export const deleteEducation = id => async dispatch => {
    try {
        // remove education from user profile 
        const res = await axios.delete(`/api/profile/education/${id}`);
        
        // send new profile data to store (profile)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        }); 

        // create alert to notify user of profile update
        dispatch(setAlert('Education credential removed from your profile', 'success'));
    } catch (error) {
        // clear user profile data (profile)
        dispatch({type: CLEAR_PROFILE}); 
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: 'Error in removing education credential from user profile' }
        });
    }
}

export const deleteExperience = id => async dispatch => {
    try {
        // remove experience from user profile 
        const res = await axios.delete(`/api/profile/experience/${id}`);
        
        // send new profile data to store (profile)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        }); 

        // create alert to notify user of profile update
        dispatch(setAlert('Experience credential removed from your profile', 'success'));
    } catch (error) {
        // clear user profile data (profile)
        dispatch({type: CLEAR_PROFILE});
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: 'Error in removing experience credential from user profile' }
        });
    }
}

export const getProfiles = () => async dispatch => {
    try {
        // clear current user profile from store (profile)
        dispatch({type: CLEAR_PROFILE});

        // get all users' profile data 
        const res = await axios.get('/api/profile/all');
        
        // send all profiles data to store (profile)
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        }); 
    } catch (error) {
        // clear user profile data (profile)
        dispatch({type: CLEAR_PROFILE});
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: 'Error in getting all users\' profile data' }
        });
    }
}

export const getProfileById = id => async dispatch => {
    try {
        // get user profile data by id 
        const res = await axios.get(`/api/profile/${id}`);
        
        // send the profile data to the store (profile)
        dispatch({
            type: GET_PROFILE, 
            payload: res.data
        }); 
    } catch (error) {
        // clear user profile data (profile)
        dispatch({ type: CLEAR_PROFILE });
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: 'Error in getting all users\' profile data' }
        });
    }
}