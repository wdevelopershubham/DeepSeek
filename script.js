
        const cells = document.querySelectorAll('.cell');
        const status = document.getElementById('status');
        const resetButton = document.getElementById('reset');
        let currentPlayer = 'X';
        let gameActive = true;
        let gameState = ['', '', '', '', '', '', '', '', ''];

        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });

        resetButton.addEventListener('click', resetGame);

        function handleCellClick(e) {
            const cell = e.target;
            const cellIndex = parseInt(cell.getAttribute('data-index'));

            if (gameState[cellIndex] !== '' || !gameActive) return;

            gameState[cellIndex] = currentPlayer;
            cell.classList.add(currentPlayer.toLowerCase());
            cell.textContent = currentPlayer;

            if (checkWin()) {
                status.innerHTML = `Player ${currentPlayer} wins! 🎉`;
                gameActive = false;
                highlightWinningCombination();
                return;
            }

            if (checkDraw()) {
                status.textContent = "Game Draw! 🤝";
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
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

        function highlightWinningCombination() {
            winningCombinations.forEach(combination => {
                if (combination.every(index => gameState[index] === currentPlayer)) {
                    combination.forEach(index => {
                        cells[index].classList.add('winning-cell');
                    });
                }
            });
        }

        function resetGame() {
            gameState = ['', '', '', '', '', '', '', '', ''];
            gameActive = true;
            currentPlayer = 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
            cells.forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('x', 'o', 'winning-cell');
            });
        }
 