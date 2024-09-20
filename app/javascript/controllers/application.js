import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus = application

export { application }


/* Base for the board and start for scoring */
const SIZE = 4;
let board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
let score = 0;

document.addEventListener("DOMContentLoaded", () => {
  createBoard();
  addRandomTile();
  addRandomTile(); /* To start a game with two random tiles */
  updateBoard();
});


function createBoard() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = ''; /* Clear the board */

  for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
          const cell = document.createElement('div');
          cell.className = 'cell'; // Add the class 'cell' to the div
          gameBoard.appendChild(cell); // Add the cell to the board
      }
  }
}

function addRandomTile() {
  let emptyCells = [];
  let count = 0;

  // Find all empty cells (where value is 0)
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (board[row][col] === 0) {
        emptyCells[count] = { row: row, col: col }; // Store empty cell coordinates
        count++; // Increase count of empty cells
      }
    }
  }

  // If there are empty cells, add a random tile
  if (count > 0) {
    let randomIndex = Math.floor(Math.random() * count); // Pick a random index
    let randomCell = emptyCells[randomIndex]; // Get the corresponding empty cell
    let randomValue = Math.random() < 0.9 ? 2 : 4; // Decide the new tile value (90% chance of 2, 10% chance of 4)
    board[randomCell.row][randomCell.col] = randomValue; // Place the new tile
  }
}


function updateBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
      const row = Math.floor(index / SIZE);
      const col = index % SIZE;
      const value = board[row][col];

      cell.textContent = value === 0 ? '' : value;
      cell.className = 'cell';
      if (value > 0) cell.classList.add(`tile-${value}`);
  });

}
