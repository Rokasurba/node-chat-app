const path = require('path'); //built in module
const express = require('express');
const http = require('http');
const socketIO =  require('socket.io');

// taip darome, kad butu patogiau nurodyti path i public folderi
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


// kad leistu naudoti public folderi
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected!'); 
    
    
    socket.emit('newMessage', {
       from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });
    
    socket.broadcast.emit('newMessage', {
       from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });
    
    // kvieciame front ende defininta eventa
    // matome CMD 
//    socket.emit('newEmail', {
//        from: 'rokas@gmail.com',
//        text: 'Hey. what is going on',
//        createAt: 123
//    });
    
    socket.on('createMessage', (data) => {
       console.log('createMessage', data);
        // emits event to all connections
        /*io.emit('newMessage', {
           from: data.from,
            text: data.text,
            createdAt: new Date().getTime()
        });*/
        // pranesima apie praenisma gaus visi bet ne as
        socket.broadcast.emit('newMessage', {
           from: data.from, 
            text: data.text,
            createdAt: new Date().getTime()
        });
    });
    
    socket.on('createEmail', (newEmail) => {
       console.log('createEmail', newEmail); 
    });
    
    socket.on('disconnect', () => {
       console.log('The user has disconnected!');
    });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server is running on ${port}` );
});


