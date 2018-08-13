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
    
    // kvieciame front ende defininta eventa
    // matome CMD 
    socket.emit('newEmail', {
        from: 'rokas@gmail.com',
        text: 'Hey. what is going on',
        createAt: 123
    });
    
    socket.emit('newMessage', {
        createdAt: '2018-08-12',
        from: 'Joshua',
        text: 'Want some cocaine?'
    });
    
    socket.on('createMessage', (data) => {
       console.log('createMessage', data);
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


