const express = require('express');
const tokenauth = require('../../middleware/tokenauth');
const Profile = require('../../models/Profile');
const {check, validationResult} = require('express-validator');

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

// @route   POST api/profile/
// @desc    create or update current user profile 
// @access  private 
router.post('/', 
    [
        tokenauth, 
        check('status', 'Please enter your status').not().isEmpty(),
        check('skills', 'Please enter your skills').not().isEmpty()
    ], 
    async (req, res) => {
        try {
            // validate and extract input 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()}); 
            }
            const {
                company,
                website,
                location,
                bio,
                status,
                githubusername,
                skills,
                youtube,
                facebook,
                twitter,
                instagram,
                linkedin
            } = req.body; 

            // build profile object 
            const profileFields = {};
            profileFields.user = req.user.id; 
            if (company || company === '') profileFields.company = company; 
            if (website || website === '') profileFields.website = website; 
            if (location || location === '') profileFields.location = location;
            if (bio || bio === '') profileFields.bio = bio; 
            if (status) profileFields.status = status; 
            if (githubusername || githubusername === '') profileFields.githubusername = githubusername; 
            if (skills) {
                profileFields.skills = skills.split(',').map(skill => skill.trim()); 
            }

            // build profile social object
            profileFields.social = {};
            if (youtube || youtube === '') profileFields.social.youtube = youtube; 
            if (twitter || twitter === '') profileFields.social.twitter = twitter;
            if (facebook || facebook === '') profileFields.social.facebook = facebook; 
            if (linkedin || linkedin === '') profileFields.social.linkedin = linkedin; 
            if (instagram || instagram === '') profileFields.social.instagram = instagram; 

            // check if profile exists, update and send to client if it exists
            let profile = await Profile.findOne({user: req.user.id});
            if (profile) {
                profile = await Profile.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: profileFields},
                    {new: true}
                ); 

                return res.json(profile);
            }

            // create new profile and send to client
            profile = new Profile(profileFields); 
            await profile.save(); 
            res.json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({errors: [
                {msg: 'Server error - unable to create/update current user profile'}
            ]}); 
        }
    }
); 

module.exports = router; 