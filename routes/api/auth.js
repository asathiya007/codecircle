const express = require('express');
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router(); 

// @route   GET /api/auth/
// @desc    test auth route -- TESTING ONLY 
// @access  public 
// router.get('/', (req, res) => res.json({msg: 'Testing auth route'})); 

// @route   POST /api/auth/
// @desc    authenticate user 
// @access  public 
router.post('/', 
    [
        check('email', 'Please enter a valid email address').isEmail(), 
        check('password', 'Please enter a password').not().isEmpty()
    ], 
    async (req, res) => {
        // validate and extract input 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const {email, password} = req.body; 

        // authenticate user and send JWT to client 
        try {
            // check if user does not exist
            const user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({errors: [
                    {msg: 'Invalid credentials'}
                ]}); 
            }

            // check for incorrect password 
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({errors: [
                    {msg: 'Invalid credentials'}
                ]}); 
            }

            // create JWT 
            const payload = {
                user: {
                    id: user._id
                }
            }
            jwt.sign(
                payload, 
                config.get('jwtKey'),
                {expiresIn: 3600},
                (err, token) => {
                    if (err) throw err; 
                    res.json({token});
                }
            ); 
        } catch (error) {
            console.error(error.message);
            res.status(500).json({errors: [
                {msg: 'Server error - unable to authenticate user'}
            ]}); 
        }
    }
)

module.exports = router; 