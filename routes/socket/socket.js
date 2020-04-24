const Connection = require('../../models/Connection');
const tokenauth = require('../../middleware/tokenauth');

module.exports = function (app, io) {
    // socket.io listening to connecting clients 
    io.on("connection", async (socket) => {
        const userId = socket.handshake.query['user']; 
        const socketId = socket.id; 

        const connection = new Connection({
            userId, 
            socketId
        }); 
        await connection.save();

        // remove from MongoDB
        socket.on("disconnect", async () => {
            await connection.remove(); 
        });

        // check to see if socket is working properly 
        io.to(socketId).emit("chat message", 'welcome to chat!');
    }); 

    // @route   POST /message
    // @desc    send message to another user (PM)
    // @access  private 
    app.post('/message', tokenauth, (req, res) => {
        const {user, recipient, message} = req.body; 
        res.json({
            user,
            recipient, 
            message
        }); 

        // fix so that it only goes to a specific user (target socketids)
        io.emit("chat message", message);
    }); 
}