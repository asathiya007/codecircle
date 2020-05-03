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
    app.post('/message', tokenauth, async (req, res) => {
        const {user, recipient, message} = req.body; 
        res.json({
            user,
            recipient, 
            message
        }); 

        // find the socketid corresponding to recipient
        const recConns = await Connection.find({userId: recipient}); 

        // fix so that it only goes to a specific user (target socketids)
        for (const conn of recConns) {
            io.to(conn.socketId).emit("chat message", message);
        }
    }); 
}