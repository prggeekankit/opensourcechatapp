const io=require('socket.io')(8000); //makes the connection with socket io

const user={}; //all users will be append here

//connection is building
io.on('connection', socket=>{
    socket.on('new-user-joined', name=>{
        user[socket.id]=name;
        socket.broadcast.emit('user-joined', name) //emiting an event when user joined
    });

    //this is the send message event by the user
    socket.on('send',message=>{
        socket.broadcast.emit('receive', {message:message, name:user[socket.id]})
    });

    //this is the event when user left the chat...
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', user[socket.id]);
        delete user[socket.id];
    })
})