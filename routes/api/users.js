const express = require('express');
const {check, validationResult} = require('express-validator');
const router = express.Router(); 
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// @route   GET /api/users/ 
// @desc    test users route -- TESTING ONLY 
// @access  public 
// router.get('/', (req, res) => res.json({msg: 'Testing users route'}));

// @route   POST /api/users/
// @desc    register users
// @access  public 
router.post('/', 
    [
        check('name', 'Please enter your name').not().isEmpty(),
        check('email', 'Please enter a valid email address').isEmail(), 
        check('password', 'Please provide a password of at least seven characters').isLength({min: 7})
    ],
    async (req, res) => {
        // verify and extract input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const {name, email} = req.body; 
        let {password} = req.body; 

        try {
            // check if user already exists 
            let user = await User.findOne({email});
            if (user) {
                return res.status(400).json({errors: [
                    {msg: 'User with provided email already exists'}
                ]}); 
            }

            // get new user gravatar 
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            }); 

            // encrypt password 
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);

            // create and save new user document
            user = new User({
                name, 
                email, 
                password, 
                avatar
            }); 
            await user.save(); 

            // create JWT and send to client 
            const payload = {
                user: {
                    id: user.id
                }
            }; 
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
                {msg: 'Server error - unable to register user'}
            ]}); 
        }
    }
); 

module.exports = router; 