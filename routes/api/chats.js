const express = require('express');
const router = express.Router(); 
const tokenauth = require('../../middleware/tokenauth');
const Chat = require('../../models/Chat');

// @route   GET api/chats 
// @desc    get all chats the user belongs to
// @access  private
router.get('/', tokenauth, async (req, res) => {
    try {
        // filter chats based on if the user is in it or not
        let chats = await Chat.find();
        chats = chats.filter(chat => {
            for (const user of chat.users) {
                if (String(user._id) === req.user.id) {
                    return true; 
                }
            }
            return false; 
        }); 
        res.json(chats);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            errors: [
                { msg: 'Server error - unable to get chats' }
            ]
        }); 
    }
}); 

// @route   POST api/chats
// @desc    create a chat 
// @access  private
router.post('/', tokenauth, async (req, res) => {
    try {
        // check if users list is valid 
        const { admin, users } = req.body;
        if (!users || users.length < 1) {
            return res.status(400).json({
                errors: [
                    {
                        msg: 'Please provide more users to include in chat'
                    }
                ]
            });
        }

        // find existing chats 
        const currChat = await Chat.find({ users });
        if (currChat && currChat[0]) {
            return res.json(currChat[0]);
        }

        const newChat = new Chat({
            admin: [
                admin
            ],
            users, 
            messages: []
        }); 
        await newChat.save(); 
        res.json(newChat);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            errors: [
                { msg: 'Server error - unable to create chat' }
            ]
        }); 
    }
}); 

// @route   DELETE api/chats/:id
// @desc    user leaves a chat  
// @access  private
router.delete('/:id', tokenauth, async (req, res) => {
    try {
        // get the chat by id 
        const chat = await Chat.findById(req.params.id); 
        if (!chat) {
            return res.status(404).json({
                errors: [
                    { msg: 'Chat not found, cannot remove user' }
                ]
            });
        }

        // filter the users
        const filteredUsers = 
            chat.users.filter(user => String(user._id) !== req.user.id);  
        chat.users = filteredUsers;
        await chat.save();  

        // return all the user's chats 
        let chats = await Chat.find();
        chats = chats.filter(chat => {
            for (const user of chat.users) {
                if (String(user._id) === req.user.id) {
                    return true;
                }
            }
            return false;
        });
        res.json(chats); 
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            errors: [
                { msg: 'Server error - unable to remove user from chat' }
            ]
        });
    }
}); 

module.exports = router; 
