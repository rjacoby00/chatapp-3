var socket = io();

socket.on('chat message', function(msg){
  var elm = document.createElement('li');
  console.log("Content" +  msg);
  elm.innerHTML = msg;
  document.getElementById('messages').appendChild(elm);
});

document.getElementById('submit').addEventListener('click', function(){
  socket.emit('chat message', document.getElementById('message').value);
});

document.getElementById('message').addEventListener("keydown", function(event) {
    if(event.key !== "Enter") return;
    document.getElementById('submit').click();
    event.preventDefault();
});
