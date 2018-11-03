const express = require('express')
const app = express()
<<<<<<< HEAD
const port = process.env.PORT || 5000
=======
const port = 5000
>>>>>>> a1b54885fd73c7e5e8e7ea2a3b056aa584c7a9f0
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

app.use(express.static('public'));

http.listen(port, () => console.log(`Example app listening on port ${port}!`));
