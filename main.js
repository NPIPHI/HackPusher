// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;


var pusher = new Pusher('12786716ab78611990ac', {
    cluster: 'us2',
    forceTLS: true,
});


var channel = pusher.subscribe('my-channel');
var privateChannel = pusher.subscribe('private-my-channel');
var username = "anonomyus";
var games = [];
var activeGame;

function addMessage(data) {
    let addedDiv = document.createElement("div");
    addedDiv.innerHTML = JSON.stringify(data.message);
    document.body.appendChild(addedDiv);
    console.log("got", data.message);
}

function postMessage(message){
    privateChannel.trigger('client-my-event', {
        "message": message,
        "user": username
    });
    
    console.log("posted", message);
}

function addGame(game, otherUser){
    activeGame = new game(username, otherUser)
    games.push(activeGame);
    document.getElementById("game-container").innerHTML = "";
    document.getElementById("game-container").appendChild(activeGame.element);
}

function sendGameMessage(message){
    privateChannel.trigger('client-game-event', {
        "message": message,
        "user": username
    });
    activeGame.update(username, message);
}

function getGameMessage(user, message){
    activeGame.update(user, message);
}

var userselect = (user)=>{console.log(user)};

function postComment(user, message){
    let messageDiv = document.createElement('div');
    messageDiv.classList.add("message");
    let userDiv = document.createElement('div');
    userDiv.classList.add("username");
    userDiv.innerHTML = user;
    userDiv.onclick = ()=>{userselect(user)};
    let textDiv = document.createElement('div');
    textDiv.classList.add("text");
    textDiv.innerHTML = message;
    messageDiv.appendChild(userDiv);
    messageDiv.appendChild(textDiv);
    document.getElementById("chatLog").appendChild(messageDiv);
}

function  getNumberOfUsers() { return presenceChannel.members.count; }

function sendMessage(){
    if(document.getElementById('text-box').value){
        postMessage(document.getElementById('text-box').value);
        postComment("you", document.getElementById('text-box').value);
        document.getElementById('text-box').value = "";
    }
}

function startGame(other, user, message){
    if(user == username){
        addGame(testGame, other);
    }
}

channel.bind('my-event', data => {postComment("server", data.message)});
privateChannel.bind('client-my-event', data=>{postComment(data.user, data.message)});
privateChannel.bind('client-game-event', data=>{getGameMessage(data.user, data.message)});
privateChannel.bind('client-game-init', data=>{startGame(data.other, data.user, data.message)});


window.onload = ()=>{
    window.addEventListener('keydown', key=>{
        if(key.key=="Enter"){
            sendMessage();
        }
    });
    
    document.getElementById("text-button").onclick = sendMessage;
    
    document.getElementById('username').addEventListener("change", ()=>{
        username = document.getElementById('username').value;
    })

    activeGame = new openGame();
    document.getElementById("game-container").appendChild(activeGame.element);

}