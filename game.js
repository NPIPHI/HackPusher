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

class testGame extends game{
    constructor(user1, user2){
        super(user1, user2);
        this.element = document.createElement("div");
    }
    update(user, message){
        if(user==user1){
            this.element.innerHTML += '1';
        }
        if(user==user2){
            this.element.innerHTML += '2';
        }
    }
}