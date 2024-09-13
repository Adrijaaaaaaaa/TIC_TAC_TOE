let currentPlayer = 'X';
let music_x = new Audio("./assets/Music-X.mp3")
let music_o = new Audio("./assets/Music-O.mp3")
let music = new Audio("./assets/Music.mp3")
let reset = document.getElementById("reset-btn");
let volume = document.getElementById("volume-btn")
let msg = document.getElementById("msg-box");
let isPlaying = false;
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

function checkRows() {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
            return true;
        }
    }
    return false;
}

function checkCols() {
    for (let i = 0; i < 3; i++) {
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '') {
            return true;
        }
    }
    return false;
}

function checkDiagonals() {
    if ((board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') ||
        (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '')) {
        return true;
    }
    return false;
}

function checkTie() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}

function checkWin() {
    return checkRows() || checkCols() || checkDiagonals();
}

function resetGame() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    currentPlayer = 'X';
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`c-${i}${j}`).innerText = ``;
        }
    }
    msg.innerText = "";

}
reset.addEventListener('click', () => {
    resetGame();
})
volume.addEventListener('click', () => {
    if (isPlaying) {
        music.pause();
        isPlaying = false;
    } else {
        music.play();
        isPlaying = true;
    }

})

function placeMark(row, col) {
    if (board[row][col] === '') {
        board[row][col] = currentPlayer;
        if (currentPlayer === 'X') {
            music_x.play();
        } else if(currentPlayer==='O'){
            music_o.play();
        }
        document.getElementById(`c-${row}${col}`).innerText = currentPlayer;
        if (checkWin()) {
            msg.innerText = `${currentPlayer} wins!`;
        } else if (checkTie()) {
            msg.innerText = 'It\'s a tie!';
        }else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}