var canvas;
var canvasContext;

function getMouseLocation(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return { x: mouseX, y: mouseY };
}

function placeLetter(evt) {
    var mouse = getMouseLocation(evt);
    var mouseX = Math.floor(mouse.x / 100);
    var mouseY = Math.floor(mouse.y / 100);
    console.log(`${mouseX} ${mouseY}`);
    if (board[mouseY][mouseX] != 'X' && board[mouseY][mouseX] != 'O') {
        board[mouseY][mouseX] = getNext();
        draw();
    }
}


board = [[], [], []];
var next = 'X';

function getNext() {
    next = next == 'X' ? 'O' : 'X';
    return next;
}

function draw() {
    canvasContext.fillStyle = "black";
    canvasContext.rect(0, 0, 300, 300);
    canvasContext.fill();

    canvasContext.strokeStyle = "white";
    canvasContext.moveTo(100, 0);
    canvasContext.lineTo(100, 300);
    canvasContext.moveTo(200, 0);
    canvasContext.lineTo(200, 300);
    canvasContext.moveTo(0, 100);
    canvasContext.lineTo(300, 100);
    canvasContext.moveTo(0, 200);
    canvasContext.lineTo(300, 200);
    canvasContext.stroke();

    canvasContext.fillStyle = "white";
    canvasContext.font = "30px Arial";
    board.forEach((row, i) => {
        row.forEach((value, j) => {
            if (value != null) {
                canvasContext.fillText(value, j * 100 + 40, i * 100 + 55);
            }
        });
    });
}

window.onload = function () {
    canvas = document.getElementById('board');
    canvasContext = canvas.getContext('2d');
    draw();
    canvas.addEventListener('click', placeLetter);
}