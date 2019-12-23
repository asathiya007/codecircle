import {SET_ALERT, REMOVE_ALERT} from './types';
import uuid from 'uuid';

export const setAlert = (msg, alertType, timeout = 3000) => dispatch => {
    // create alert with provided data (with specific id)
    const id = uuid.v4(); 
    dispatch({
        type: SET_ALERT,
        payload: {msg, alertType, id}
    }); 

    // destroy alert (with specific id)
    setTimeout(() => dispatch({
        type: REMOVE_ALERT, 
        payload: id
    }), timeout);
}