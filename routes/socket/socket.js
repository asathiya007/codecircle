module.exports = function (io) {
    // socket.io listening to connecting clients 
    io.on("connection", (socket) => {
        console.log("a user connected");
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
        io.emit("chat message", 'welcome to chat!');
    }); 
}