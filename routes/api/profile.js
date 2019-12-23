const express = require('express');
const tokenauth = require('../../middleware/tokenauth');
const Profile = require('../../models/Profile');

const router = express.Router(); 

// @route   GET api/profile/me
// @desc    get current user's profile 
// @access  private 
router.get('/me', tokenauth, async (req, res) => {
    try {
        // find the profile
        const profile = await Profile.findOne({user: req.user.id}); 

        // check if the profile does not exist
        if (!profile) {
            return res.status(404).json({errors: [
                {msg: 'Current user profile does not exist'}
            ]}); 
        }

        // populate user object with name and avatar pic
        profile.populate('user', ['name', 'avatar']); 

        // send profile data to client
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server error - unable to get current user profile');
    }
});

module.exports = router; 