var socket = io();

socket.on('chat message', function(msg){
  parsed = JSON.parse(msg);
  var elm = document.createElement('tr');
  elm.innerHTML = "<td>"+parsed.User+"</td><td>"+parsed.Message+"</td>";
  document.getElementById('messages').appendChild(elm);
});

document.getElementById('submit').addEventListener('click', function(){
  message = document.getElementById('message').value;
  user = document.getElementById('user').value;
  socket.emit('chat message', '{ "User":"'+user+'","Message":"'+message+'"}');
  document.getElementById('message').value = "";
});

document.getElementById('message').addEventListener("keydown", function(event) {
    if(event.key !== "Enter") return;
    document.getElementById('submit').click();
    event.preventDefault();
});
