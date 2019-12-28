const express = require('express');
const tokenauth = require('../../middleware/tokenauth');
const Profile = require('../../models/Profile');
const {check, validationResult} = require('express-validator');

const router = express.Router(); 

// @route   GET /api/profile/me
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
        res.status(500).json({
            errors: [
                { msg: 'Server error - unable to get current user profile' }
            ]
        });
    }
});

// @route   GET /api/profile/all
// @desc    get all users' profiles
// @access  public 
router.get('/all', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [
            {msg: 'Server error - unable to get all user profiles'}
        ]}); 
    }
}); 

// @route   POST /api/profile/
// @desc    create or update current user profile 
// @access  private 
router.post('/', 
    [
        tokenauth, 
        check('occupation', 'Please enter your occupation').not().isEmpty(),
        check('skills', 'Please enter your skills').not().isEmpty(),
        check('email', 'Please provide user\'s email address').isEmail(),
        check('name', 'Please provide user\'s name').not().isEmpty()
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
                name, 
                email, 
                phone, 
                bio,
                occupation,
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
            if (email) profileFields.email = email; 
            if (name) profileFields.name = name;
            if (phone || phone === '') profileFields.phone = phone; 
            if (bio || bio === '') profileFields.bio = bio; 
            if (occupation) profileFields.occupation = occupation; 
            if (githubusername || githubusername === '') profileFields.githubusername = githubusername; 
            if (skills) {
                if (Array.isArray(skills)) {
                    profileFields.skills = skills; 
                } else {
                    profileFields.skills = skills.split(',').map(skill => skill.trim()); 
                }
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

// @route   PUT /api/profile/education
// @desc    add profile education 
// @access  private 
router.put('/education', 
[
    tokenauth, 
    [
        check('institution', 'Please enter the name of the institution').not().isEmpty(),
        check('degree', 'Please enter the degree program').not().isEmpty(), 
        check('fieldOfStudy', 'Please enter the field of study').not().isEmpty(), 
        check('from', 'Please enter the education start date').not().isEmpty()
    ]
], async (req, res) => {
    try {
        // validate and extract input 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        
        // fetch profile, if one exists 
        const profile = await Profile.findOne({user: req.user.id});
        if (!profile) {
            res.status(404).json({errors: [
                {msg: 'Profile for current user not found'}
            ]}); 
        }

        // add education to profile 
        profile.education.unshift(req.body);
        await profile.save(); 
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            errors: [
                { msg: 'Server error - unable to add education to current user profile' }
            ]
        });
    }
}); 

// @route   DELETE /api/profile/education/:id
// @desc    delete profile education 
// @access  private 
router.delete('/education/:id', tokenauth, async (req, res) => {
    try {
        // fetch profile, if one exists 
        const profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            res.status(404).json({
                errors: [
                    { msg: 'Profile for current user not found' }
                ]
            });
        }

        // remove education from profile  
        profile.education = profile.education.filter(edu => edu._id.toString() !== req.params.id); 
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            errors: [
                { msg: 'Server error - unable to delete education from current user profile' }
            ]
        });
    }
}); 

// @route   PUT /api/profile/experience
// @desc    add profile experience 
// @access  private 
router.put('/experience', 
[
    tokenauth, 
    [
        check('title', 'Please enter the job title').not().isEmpty(),
        check('company', 'Please enter the name of the company').not().isEmpty(),  
        check('from', 'Please enter the education start date').not().isEmpty()
    ]
], async (req, res) => {
    try {
        // validate and extract input 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        } 

        // fetch profile, if one exists 
        const profile = await Profile.findOne({user: req.user.id});
        if (!profile) {
            res.status(404).json({errors: [
                {msg: 'Profile for current user not found'}
            ]}); 
        }

        // add experience to profile 
        profile.experience.unshift(req.body);
        await profile.save(); 
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            errors: [
                { msg: 'Server error - unable to add experience to current user profile' }
            ]
        });
    }
});

// @route   DELETE /api/profile/experience/:id
// @desc    delete profile experience 
// @access  private 
router.delete('/experience/:id', tokenauth, async (req, res) => {
    try {
        // fetch profile, if one exists 
        const profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            res.status(404).json({
                errors: [
                    { msg: 'Profile for current user not found' }
                ]
            });
        }

        // remove education from profile  
        profile.experience = profile.experience.filter(exp => exp._id.toString() !== req.params.id); 
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            errors: [
                { msg: 'Server error - unable to delete experience from current user profile' }
            ]
        });
    }
});

module.exports = router; 