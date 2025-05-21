const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameState[cellIndex] !== '' || !gameActive) return;

    // Add animation class before placing the mark
    cell.style.transform = 'scale(0.8)';
    cell.style.opacity = '0';

    setTimeout(() => {
        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
        
        // Animate the mark appearing
        cell.style.transform = 'scale(1)';
        cell.style.opacity = '1';

        // Check for win or draw after the mark is placed
        if (checkWin()) {
            gameActive = false;
            status.textContent = `Player ${currentPlayer} wins!`;
            status.style.color = currentPlayer === 'X' ? '#e74c3c' : '#3498db';
            highlightWinningCells();
            return;
        }

        if (checkDraw()) {
            gameActive = false;
            status.textContent = "Game ended in a draw!";
            status.style.color = '#7f8c8d';
            return;
        }

        // Switch player only if game is still active
        if (gameActive) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
            status.style.color = currentPlayer === 'X' ? '#e74c3c' : '#3498db';
        }
    }, 150);
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function checkDraw() {
    return gameState.every(cell => cell !== '');
}

function highlightWinningCells() {
    winningCombinations.forEach(combination => {
        if (combination.every(index => gameState[index] === currentPlayer)) {
            combination.forEach((index, i) => {
                setTimeout(() => {
                    cells[index].classList.add('winning-cell');
                }, i * 200); // Stagger the animation
            });
        }
    });
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    status.textContent = `Player ${currentPlayer}'s turn`;
    status.style.color = '#e74c3c';
    
    cells.forEach((cell, index) => {
        setTimeout(() => {
            cell.style.transform = 'scale(0.8)';
            cell.style.opacity = '0';
            
            setTimeout(() => {
                cell.textContent = '';
                cell.classList.remove('x', 'o', 'winning-cell');
                cell.style.transform = 'scale(1)';
                cell.style.opacity = '1';
            }, 150);
        }, index * 50); // Stagger the reset animation
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame); 