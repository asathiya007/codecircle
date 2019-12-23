import axios from 'axios';

const setAuthToken = token => {
    // if token exists, set axios token header, else clear axios token header
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token; 
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken; 