var socket = io();
var lastUser = '';
var mobileTyping = false;

socket.on('chat message', function(msg){
  parsed = JSON.parse(msg);
  var elm = document.createElement('div');
  elm.classList.add("bblmsg");
  if (parsed.User == document.getElementById('user').value) {
    if (lastUser == parsed.User) {
      last_messsge = document.getElementsByClassName('bblmsg-self')[document.getElementsByClassName('bblmsg-self').length-1];
      last_messsge.classList.remove("bblmsg-self");
      last_messsge.classList.add("bblmsg-self-repeat");
    }
    elm.innerHTML = "<span class='bblmsg-msg bblmsg-self'>"+parsed.Message+"</span>";
  } else {
    if (lastUser == parsed.User) {
      last_messsge = document.getElementsByClassName('bblmsg-other')[document.getElementsByClassName('bblmsg-other').length-1];
      last_messsge.classList.remove("bblmsg-other");
      last_messsge.classList.add("bblmsg-other-repeat");
      elm.innerHTML = "</span><span class='bblmsg-msg bblmsg-other'>"+parsed.Message+"</span>";
    } else {
      elm.innerHTML = "<span class='bblmsg-name'>"+parsed.User+"</span><span class='bblmsg-msg bblmsg-other'>"+parsed.Message+"</span>";
    }
  }
  document.getElementById('messages').appendChild(elm);
  lastUser =  parsed.User;
  var cont = document.getElementsByClassName("container")[0];
  cont.scrollTop = cont.scrollHeight;
});

document.getElementById('submit').addEventListener('click', function(){
  message = document.getElementById('message').value;
  if (message) {
    user = document.getElementById('user').value;
    socket.emit('chat message', '{ "User":"'+user+'","Message":"'+message+'"}');
    document.getElementById('message').value = "";
  }
});

document.getElementById('message').addEventListener("keydown", function(event) {
    if(event.key !== "Enter") return;
    document.getElementById('submit').click();
    event.preventDefault();
});

function openType() {
  mobileTyping = true;
  var typeBar = document.getElementById("form");
  var cont = document.getElementsByClassName("container")[0];
  typeBar.style.bottom = "50%";
  cont.style.paddingBottom = "calc(50%+40px)";
}
function closeType() {
  if (mobileTyping === true) {
    mobileTyping = false;
    var typeBar = document.getElementById("form");
    var cont = document.getElementsByClassName("container")[0];
    typeBar.style.bottom = null;
    cont.style.paddingBottom = null;
  }
}
