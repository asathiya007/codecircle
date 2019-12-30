const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
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
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ], 
    loves: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ], 
    laughs: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ], 
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }, 
            text: {
                type: String
            }, 
            name: {
                type: String
            }, 
            avatar: {
                type: String
            }, 
            date: {
                type: Date, 
                default: Date.now
            }, 
            file: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'file'
            }, 
            likes: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user'
                    }
                }
            ], 
            loves: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user'
                    }
                }
            ], 
            laughs: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user'
                    }
                }
            ]
        }
    ], 
    file: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'file'
    }
}); 

module.exports = Post = mongoose.model('post', PostSchema);