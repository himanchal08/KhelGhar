var board;
var playerO = "O";
var playerX = "X";
var currPlayer;
var gameOver = false;
var gameMode = "human";
var score = { O: 0, X: 0 };
var aiWins = 0;
var humanWins = 0;

window.onload = function () {
    document.getElementById("modeSelect").addEventListener("change", toggleDifficulty);
};

function toggleDifficulty() {
    const mode = document.getElementById("modeSelect").value;
    document.getElementById("difficultyLabel").classList.toggle("hidden", mode !== "ai");
}

function startGame() {
    const mode = document.getElementById("modeSelect").value;
    const difficulty = document.getElementById("difficultySelect").value;

    gameMode = mode;
    aiDifficulty = difficulty;
    score = { O: 0, X: 0 };
    aiWins = 0;
    setGame();
}

function setGame() {
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];
    currPlayer = playerO;
    gameOver = false;
    document.getElementById("board").innerHTML = "";
    document.getElementById("scoreboard").innerText = `Score - O: ${score.O} | X: ${score.X}`;
    
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            if (r < 2) tile.classList.add("horizontal-line");
            if (c < 2) tile.classList.add("vertical-line");
            tile.innerText = "";
            tile.addEventListener("click", setTile);
            document.getElementById("board").appendChild(tile);
        }
    }
    document.getElementById("replay").classList.add("hidden");
}

function setTile() {
    if (gameOver) return;

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] !== ' ') return;
    
    board[r][c] = currPlayer;
    this.innerText = currPlayer;
    this.classList.add("placed");

    checkWinner();
    if (gameOver) return;
    
    currPlayer = currPlayer === playerO ? playerX : playerO;

    if (gameMode === "ai" && currPlayer === playerX) {
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    if (gameOver) return;

    let move;

    if (aiDifficulty === "easy") {
        move = getRandomMove();
    } else if (aiDifficulty === "medium") {
        move = getBestMoveMedium();
    } else if (aiDifficulty === "hard") {
        move = minimax(board, playerX).move;
    }

    if (move) {
        let [r, c] = move;
        board[r][c] = playerX;
        let tile = document.getElementById(`${r}-${c}`);
        tile.innerText = playerX;
        tile.classList.add("placed");
        checkWinner();
        if (!gameOver) currPlayer = playerO;
    }
}
function getRandomMove() {
    let options = [];
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (board[r][c] === ' ') options.push([r, c]);
        }
    }
    return options.length ? options[Math.floor(Math.random() * options.length)] : null;
}

function getBestMoveMedium() {
   
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (board[r][c] === ' ') {
                board[r][c] = playerX;
                if (isWinner(playerX)) {
                    board[r][c] = ' ';
                    return [r, c];
                }
                board[r][c] = ' ';
            }
        }
    }
    
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (board[r][c] === ' ') {
                board[r][c] = playerO;
                if (isWinner(playerO)) {
                    board[r][c] = ' ';
                    return [r, c];
                }
                board[r][c] = ' ';
            }
        }
    }
    return getRandomMove(); 
}
function minimax(newBoard, player) {
    if (isWinner(playerO)) return { score: -10 };
    if (isWinner(playerX)) return { score: 10 };
    if (isBoardFull(newBoard)) return { score: 0 };

    let moves = [];

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (newBoard[r][c] === ' ') {
                newBoard[r][c] = player;
                let result = minimax(newBoard, player === playerX ? playerO : playerX);
                moves.push({
                    move: [r, c],
                    score: result.score
                });
                newBoard[r][c] = ' ';
            }
        }
    }

    let bestMove;
    if (player === playerX) {
        let bestScore = -Infinity;
        for (let m of moves) {
            if (m.score > bestScore) {
                bestScore = m.score;
                bestMove = m;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let m of moves) {
            if (m.score < bestScore) {
                bestScore = m.score;
                bestMove = m;
            }
        }
    }
    return bestMove;
}

function isBoardFull(b) {
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (b[r][c] === ' ') return false;
        }
    }
    return true;
}

function isWinner(player) {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) return true;
        if (board[0][i] === player && board[1][i] === player && board[2][i] === player) return true;
    }
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true;
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true;
    return false;

}

function checkWinner() {
    for (let r = 0; r < 3; r++) {
        if (board[r][0] === board[r][1] && board[r][1] === board[r][2] && board[r][0] !== ' ') {
            highlightWinner([[r, 0], [r, 1], [r, 2]]);
            updateScore(board[r][0]);
            gameOver = true;
            showReplayButton();
            return;
        }

    }

    for (let c = 0; c < 3; c++) {
        if (board[0][c] === board[1][c] && board[1][c] === board[2][c] && board[0][c] !== ' ') {
            highlightWinner([[0, c], [1, c], [2, c]]);
            updateScore(board[0][c]);
            gameOver = true;
            showReplayButton();
            return;
        }
    }
    
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== ' ') {
        highlightWinner([[0, 0], [1, 1], [2, 2]]);
        updateScore(board[0][0]);
        gameOver = true;
        showReplayButton();
        return;
    }
    
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== ' ') {
        highlightWinner([[0, 2], [1, 1], [2, 0]]);
        updateScore(board[0][2]);
        gameOver = true;
        showReplayButton();
        return;
    }
    if (isBoardFull(board)) {
        gameOver = true;
        alert("It's a draw!");
        showReplayButton();
    }
}

function highlightWinner(coords) {
    for (let [r, c] of coords) {
        document.getElementById(r.toString() + "-" + c.toString()).classList.add("winner");
    }
}

function updateScore(winner) {
    var p1=0;
    var p2=0;
    if (winner === playerO) {
        score.O++;
        if (gameMode === "ai") humanWins++;
        if (gameMode === "human") p1++;
    } else if (winner === playerX) {
        score.X++;
        if (gameMode === "ai") aiWins++;
        if (gameMode === "human") p2++;
    }
    
    if (gameMode === "ai"&& winner === playerX) {
        document.getElementById("scoreboard").innerText = `Score - O: ${score.O} | X: ${score.X} (AI Wins: ${aiWins})`;
        
    }
    else if (gameMode === "ai"&& winner === playerO) {
        document.getElementById("scoreboard").innerText = `Score - O: ${score.O} | X: ${score.X} (Human Wins: ${humanWins})`;
    }
    if (gameMode === "human"&& winner === playerX) {
        document.getElementById("scoreboard").innerText = `Score - O: ${score.O} | X: ${score.X} (PlayerX: ${p2})`;
        
    }
    else if (gameMode === "human"&& winner === playerO) {
        document.getElementById("scoreboard").innerText = `Score - O: ${score.O} | X: ${score.X} (PlayerO: ${p1})`;
    }
  
    
}

function showReplayButton() {
    document.getElementById("replay").classList.toggle("hidden");
}

function replayGame() {
    setGame();
}
