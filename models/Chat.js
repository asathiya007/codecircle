const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ], 
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'message'
        }
    ]
}); 

module.exports = Chat = mongoose.model('chat', ChatSchema);