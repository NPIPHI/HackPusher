// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('12786716ab78611990ac', {
    cluster: 'us2',
    forceTLS: true,
});

function addMessage(data) {
    let addedDiv = document.createElement("div");
    addedDiv.innerHTML = JSON.stringify(data.message);
    document.body.appendChild(addedDiv);
    console.log("got", data.message);
}

function postMessage(message){
    privateChannel.trigger('client-my-event', {
        "message": message,
        "user": "joe"
    });
    
    console.log("posted", message);
}

function postComment(user, message){
    let messageDiv = document.createElement('div');
    messageDiv.classList.add("message");
    let userDiv = document.createElement('div');
    userDiv.classList.add("username");
    userDiv.innerHTML = user;
    let textDiv = document.createElement('div');
    textDiv.classList.add("text");
    textDiv.innerHTML = message;
    messageDiv.appendChild(userDiv);
    messageDiv.appendChild(textDiv);
    document.getElementById("chatLog").appendChild(messageDiv);
}

function  getNumberOfUsers() { return presenceChannel.members.count; }

var channel = pusher.subscribe('my-channel');
var privateChannel = pusher.subscribe('private-my-channel');
var presenceChannel = pusher.subscribe('presence-ericChannel');

channel.bind('my-event', data => {addMessage(data)});
privateChannel.bind('client-my-event', data=>{postComment(data.user, data.message)});

window.addEventListener('keydown', key=>{
    if(key.key=="Enter"){
        postMessage(document.getElementById('text-box').value);
        postComment("you", document.getElementById('text-box').value);
    }
});

document.getElementById('username').addEventListener("change", text=>{
    var username = document.getElementById('username').value;
})