class ticTacToe extends game {
    constructor(user1, user2) {
        super(user1, user2);
        this.element = document.createElement('canvas');
        this.element.width = 300;
        this.element.height = 300;
        this.element.style = "border:1px solid #d3d3d3;";
        this.ctx = this.element.getContext("2d");
        this.element.onclick = this.placeLetter;
        this.element.game = this;
        this.draw();
    }
    getMouseLocation(evt) {
        var rect = this.element.getBoundingClientRect();
        var root = document.documentElement;
        var mouseX = evt.clientX - rect.left - root.scrollLeft;
        var mouseY = evt.clientY - rect.top - root.scrollTop;
        return { x: mouseX, y: mouseY };
    }

    placeLetter(evt) {
        var mouse = this.game.getMouseLocation(evt);
        var mouseX = Math.floor(mouse.x / 100);
        var mouseY = Math.floor(mouse.y / 100);
        console.log(`${mouseX} ${mouseY}`);
        if (this.game.board[mouseY][mouseX] != 'X' && this.game.board[mouseY][mouseX] != 'O') {
            sendGameMessage(mouseX + ':' + mouseY);
        }
    }


    board = [[], [], []];
    next = 'X';

    getNext() {
        this.next = this.next == 'X' ? 'O' : 'X';
        return this.next;
    }

    update(user, message) {

        if (user == this.user1 || user == this.user2) {
            let split = message.split(':');
            this.board[split[1]][split[0]] = this.getNext();
            this.draw();
        }
    }

    winner() {
        // this.board.forEach(row => {
        //     if (row.every(square => square == 'O')) {
        //         return 'O';
        //     } else if (row.every(square => square == 'X')) {
        //         return 'X';
        //     }
        // });
        // this.board[0].forEach((square, i) => {
        //     const col = this.board.map(row => row[i]);
        //     if (col.every(square => square == 'O')) {
        //         return 'O';
        //     } else if (col.every(square => square == 'X')) {
        //         return 'X';
        //     }
        // });
        try {
            if (this.board[0][0] === 'O' && this.board[0][1] === 'O' && this.board[0][2] === 'O') {
                return 'O';
            } else if (this.board[0][0] === 'X' && this.board[0][1] === 'X' && this.board[0][2] === 'X') {
                return 'X';
            }
        } catch (e) {

        }

        try {
            if (this.board[1][0] === 'O' && this.board[1][1] === 'O' && this.board[1][2] === 'O') {
                return 'O';
            } else if (this.board[1][0] === 'X' && this.board[1][1] === 'X' && this.board[1][2] === 'X') {
                return 'X';
            }
        } catch (e) {

        }

        try {
            if (this.board[2][0] === 'O' && this.board[2][1] === 'O' && this.board[2][2] === 'O') {
                return 'O';
            } else if (this.board[2][0] === 'X' && this.board[2][1] === 'X' && this.board[2][2] === 'X') {
                return 'X';
            }
        } catch (e) {

        }

        try {
            if (this.board[0][0] === 'O' && this.board[1][0] === 'O' && this.board[2][0] === 'O') {
                return 'O';
            } else if (this.board[0][0] === 'X' && this.board[1][0] === 'X' && this.board[2][0] === 'X') {
                return 'X';
            }
        } catch (e) {

        }

        try {
            if (this.board[0][1] === 'O' && this.board[1][1] === 'O' && this.board[2][1] === 'O') {
                return 'O';
            } else if (this.board[0][1] === 'X' && this.board[1][1] === 'X' && this.board[2][1] === 'X') {
                return 'X';
            }
        } catch (e) {

        }

        try {
            if (this.board[0][2] === 'O' && this.board[1][2] === 'O' && this.board[2][2] === 'O') {
                return 'O';
            } else if (this.board[0][2] === 'X' && this.board[1][2] === 'X' && this.board[2][2] === 'X') {
                return 'X';
            }
        } catch (e) {

        }

        try {
            if (this.board[0][0] === 'O' && this.board[1][1] === 'O' && this.board[2][2] === 'O') {
                return 'O';
            } else if (this.board[0][0] === 'X' && this.board[1][1] === 'X' && this.board[2][2] === 'X') {
                return 'X';
            }
        } catch (e) {

        }

        try {
            if (this.board[2][0] === 'O' && this.board[1][1] === 'O' && this.board[0][2] === 'O') {
                return 'O';
            } else if (this.board[2][0] === 'X' && this.board[1][1] === 'X' && this.board[0][2] === 'X') {
                return 'X';
            }
        } catch (e) {

        }

        return null;
    }

    draw() {
        this.ctx.fillStyle = "black";
        this.ctx.rect(0, 0, 300, 300);
        this.ctx.fill();

        this.ctx.strokeStyle = "white";
        this.ctx.moveTo(100, 0);
        this.ctx.lineTo(100, 300);
        this.ctx.moveTo(200, 0);
        this.ctx.lineTo(200, 300);
        this.ctx.moveTo(0, 100);
        this.ctx.lineTo(300, 100);
        this.ctx.moveTo(0, 200);
        this.ctx.lineTo(300, 200);
        this.ctx.stroke();

        this.ctx.fillStyle = "white";
        this.ctx.font = "30px Arial";
        this.board.forEach((row, i) => {
            row.forEach((value, j) => {
                if (value != null) {
                    this.ctx.fillText(value, j * 100 + 40, i * 100 + 55);
                }
            });
        });
    }
}