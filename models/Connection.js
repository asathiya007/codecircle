const mongoose = require('mongoose');

const ConnectionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    socketId: {
        type: String
    }
});

module.exports = Connection = mongoose.model('connection', ConnectionSchema);