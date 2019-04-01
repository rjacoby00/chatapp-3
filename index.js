const express = require('express');
const app = express();
const port = process.env.PORT;
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    socket.emit('chat message', msg);
  });
});

app.use(express.static('public'));

http.listen(port, () => console.log(`Example app listening on port ${port}!`));
