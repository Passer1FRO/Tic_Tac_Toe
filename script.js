const cells = document.querySelectorAll('.cell');
const popup = document.getElementById('popup');
const winnerMessage = document.getElementById('winner-message');
const restartButton = document.getElementById('restart-button');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameBoard[clickedCellIndex] = currentPlayer;
    clickedCell.classList.add(currentPlayer);
    clickedCell.innerText = currentPlayer;

    checkWin();
    if (gameActive) {
        switchPlayer();
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = gameBoard[winCondition[0]];
        const b = gameBoard[winCondition[1]];
        const c = gameBoard[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            gameActive = false;
            displayWinner(currentPlayer);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        displayWinner('Draw!');
    }
}

function displayWinner(result) {
    winnerMessage.innerText = `Game Over! ${result === 'Draw!' ? result : currentPlayer + ' wins!'}`;
    popup.classList.add('show');
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('x', 'o');
    });
    popup.classList.remove('show');
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);