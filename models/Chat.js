const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    admin: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ], 
    users: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            name: {
                type: String
            }, 
            avatar: {
                type: String
            }
        }
    ], 
    messages: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            name: {
                type: String,
                required: true
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            },
            text: {
                type: String
            },
            file: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'file'
            }
        }
    ]
}); 

module.exports = Chat = mongoose.model('chat', ChatSchema);