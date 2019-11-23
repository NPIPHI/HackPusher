class game{
    element;
    user1;
    user2;
    constructor(user1, user2){
        this.user1 = user1;
        this.user2 = user2;
    }
    update(user, message){}
}

class openGame extends game{
    constructor(){
        super('','');
        this.element = document.createElement("div");
        this.element.style.height = "100px";
        this.element.style.backgroundColor = "black";
        userselect = (user)=>{addGame(testGame, user);
            privateChannel.trigger('client-game-init', {
                other: username,
                user: user,
                message: "testGame"
            })}
    }
    update(user, message){}
}

class testGame extends game{
    constructor(user1, user2){
        super(user1, user2);
        this.element = document.createElement("div");
        this.element.style.height = "100px";
        this.element.style.backgroundColor = "white";
        this.element.onclick = ()=>{
            this.update(username, "1");
            sendGameMessage("1");
        }
    }
    update(user, message){
        if(user==this.user1){
            this.element.innerHTML += '1';
        }
        if(user==this.user2){
            this.element.innerHTML += '2';
        }
    }
}