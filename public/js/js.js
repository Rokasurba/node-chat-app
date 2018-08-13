// front end JS
var socket = io();

// sukuriame eventus cliento puseje, kurie klausosi, siuncia request i serverio puse
socket.on('connect', function () {
   console.log('Connected to server'); 
    
    socket.emit('createEmail', {
       to: 'rokas@gmail.com',
       text: 'Hey, tai as Rokas!'
    });
    
    socket.emit('createMessage', {
      from: 'mantas',
      text: 'kas per velnias? I dont need no cocaine!'
    });
});

socket.on('disconnect', function () {
    console.log('Server was to shutdown!');1
});  

// data gauname is serverio
socket.on('newEmail', function (data) {
   console.log('New email', data); 
});

socket.on('newMessage', function(data) {
   console.log(data); 
});