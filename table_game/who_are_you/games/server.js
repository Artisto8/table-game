const io = require('socket.io')(3000, { cors: { origin: '*' } });

io.on('connection', socket => {
    socket.on('join-room', room => {
        socket.join(room);
        socket.to(room).emit('user-joined', socket.id);

        socket.on('signal', ({ to, data }) => {
            io.to(to).emit('signal', { from: socket.id, data });
        });

        socket.on('disconnect', () => {
            socket.to(room).emit('user-left', socket.id);
        });
    });
});