const io = require('socket.io')('8001');


io.sockets.on('connection', function (socket) {
    socket.on('sent-message', message =>  {
        socket.emit("user-message", message);
    })
})