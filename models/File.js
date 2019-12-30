const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    }, 
    name: {
        type: String
    }, 
    data: {
        type: Buffer
    }, 
    size: {
        type: Number
    }, 
    mimetype: {
        type: String
    }
}); 

module.exports = File = mongoose.model('file', FileSchema);