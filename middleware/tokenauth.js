const jwt = require('jsonwebtoken');
const config = require('config');

const tokenauth = (req, res, next) => {
    try {
        // check if token exists 
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(400).json({
                errors: [
                    { msg: 'No token provided, authentication failed' }
                ]
            });
        }

        // verify token, extract payload (user id)
        const payload = jwt.verify(token, config.get('jwtKey'));
        req.user = payload.user; 
        next(); 
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [
            {msg: 'Server error - unable to authenticate token'}
        ]}); 
    }
}

module.exports = tokenauth; 