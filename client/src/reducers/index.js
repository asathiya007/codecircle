import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
// import chat from './chat';
// import users from './users';

export default combineReducers({
    alert,
    auth,
    profile, 
    post,
    // chat,
    // users
});