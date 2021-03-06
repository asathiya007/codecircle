const express = require('express');
const {check, validationResult} = require('express-validator');
const router = express.Router(); 
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const tokenauth = require('../../middleware/tokenauth');

// @route   GET /api/users/test 
// @desc    test users route -- TESTING ONLY 
// @access  public 
// router.get('/test', (req, res) => res.json({msg: 'Testing users route'}));

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

// @route   GET /api/users/me
// @desc    get current user data 
// @access  private
router.get('/me', tokenauth, async (req, res) => {
    try {
        // check if user exists 
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({errors: [
                {msg: 'Current user data not found'}
            ]}); 
        }

        // return user data to client
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [
            {msg: 'Server error - unable to get current user data'}
        ]}); 
    }
});

// @route   DELETE /api/users/
// @desc    delete current user
// @access  private
router.delete('/', tokenauth, async (req, res) => {
    try {
        // delete the user's posts 
        await Post.deleteMany({user: req.user.id});

        // delete the user's profile 
        await Profile.findOneAndRemove({user: req.user.id});

        // delete the user 
        await User.findByIdAndRemove(req.user.id);

        res.json({msg: 'User account deleted'}); 
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [
            {msg: 'Server error - unable to delete user account'}
        ]}); 
    }
}); 

// @route   GET /api/users/:id
// @desc    get user info based on id
// @access  private
router.get('/:id', tokenauth, async (req, res) => {
    try {
        const {id} = req.params; 
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                errors: [
                    { msg: 'User data not found' }
                ]
            });
        }

        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            errors: [
                { msg: 'Server error - unable to get user data' }
            ]
        });
    }
}); 

// @route   GET /api/users
// @desc    get all users
// @access  private
router.get('/', tokenauth, async (req, res) => {
    try {
        let users = await User.find().select('-password');
        users = users.filter(user => String(user._id) !== req.user.id); 

        if (!users) {
            return res.status(404).json({
                errors: [
                    { msg: 'All users data not found' }
                ]
            });
        }

        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            errors: [
                { msg: 'Server error - unable to get all users data' }
            ]
        });
    }
}); 

module.exports = router; 