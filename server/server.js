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
    
    socket.on('disconnect', () => {
       console.log('The user has disconnected!');
    });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server is running on ${port}` );
});


