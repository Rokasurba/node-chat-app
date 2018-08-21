// front end JS
var socket = io();

// sukuriame eventus cliento puseje, kurie klausosi, siuncia request i serverio puse
socket.on('connect', function () {
   console.log('Connected to server'); 
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
    var li = $('<li></li>');
    li.text(`${data.from}: ${data.text}`);
    
    $('#messages').append(li);
});

// emitinam eventa serveryje ir gauname is jo callbacka

$('#message-form').on('submit', function (e) {
   e.preventDefault();  
    console.log('Thi dadaskdas');
    socket.emit('createMessage', {
       from: 'User',
        text: $('[name=message]').val()
    }, function () {
        
    });
});