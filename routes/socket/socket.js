const Connection = require('../../models/Connection');
const Chat = require('../../models/Chat');
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
        try {
            const {user, chat, message} = req.body;
            const recipients = chat.users; 
            const {_id, name, avatar} = user; 

            // find the chat and add the message to it 
            const userChat = await Chat.findById(chat._id);
            userChat.messages.push({
                user: _id, 
                name, 
                avatar, 
                text: message
            });
            await userChat.save(); 
            res.json(userChat);

            // send the message to other users if they are connected
            for (const recipient of recipients) {
                // find the socketid corresponding to recipient
                const recConns = await Connection.find({ userId: recipient });

                // fix so that it only goes to a specific user (target socketids)
                for (const conn of recConns) {
                    io.to(conn.socketId).emit("chat message", message);
                }
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({
                errors: [
                    { msg: 'Server error - unable to send message' }
                ]
            }); 
        }
    }); 
}