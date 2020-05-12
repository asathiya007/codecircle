const express = require('express');
const router = express.Router(); 
const tokenauth = require('../../middleware/tokenauth');

// @route   GET api/chats 
// @desc    get all chats 
// @access  private
router.get('/', tokenauth, (req, res) => {
    // TODO: get all chats from db
    res.json({userId: req.user.id});
}); 

// @route   POST api/chats
// @desc    create a chat 
// @access  private
router.post('/', tokenauth, (req, res) => {
    // TODO: create chat and store in db
    res.json('created chat');
}); 

module.exports = router; 
