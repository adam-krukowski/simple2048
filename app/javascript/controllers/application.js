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
  addRandomTile(); /* to start a game with two random tiles */
});


function createBoard() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = ''; // Clear the board

  for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
          const cell = document.createElement('div');
          cell.className = 'cell'; // Add the class 'cell' to the div
          gameBoard.appendChild(cell); // Add the cell to the board
      }
  }
}

function addRandomTile() {
  const emptyCells = [];

  for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
          if (board[row][col] === 0) {
              emptyCells.push({ row, col });
          }
      }
  }

  if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const randomCell = emptyCells[randomIndex];
      board[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
  }
}
