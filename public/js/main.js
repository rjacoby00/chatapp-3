var socket = io();

socket.on('chat message', function(msg){
  parsed = JSON.parse(msg);
  var elm = document.createElement('div');
  if (parsed.User == document.getElementById('user').value) {
    elm.classList.add("bblmsg");
    elm.innerHTML = "<span class='bblmsg-msg-self'>"+parsed.Message+"</span>";
    document.getElementById('dev').innerHTML = "Self";
  } else {
    elm.classList.add("bblmsg");
    elm.innerHTML = "<span class='bblmsg-name'>"+parsed.User+"</span><span class='bblmsg-msg'>"+parsed.Message+"</span>";
    document.getElementById('dev').innerHTML = "Someone else";
  }
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
