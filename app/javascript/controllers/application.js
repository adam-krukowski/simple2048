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

  document.getElementById('up').addEventListener('click', () => move('up'));
  document.getElementById('down').addEventListener('click', () => move('down'));
  document.getElementById('left').addEventListener('click', () => move('left'));
  document.getElementById('right').addEventListener('click', () => move('right'));
  document.getElementById('reset').addEventListener('click', resetGame);

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

  document.getElementById('score').textContent = `Score: ${score}`;

}


function moveLeft() {
  let moved = false;
  for (let row = 0; row < SIZE; row++) {
      const originalRow = [...board[row]];
      let newRow = combineRow(board[row]);
      if (JSON.stringify(newRow) !== JSON.stringify(originalRow)) {
          moved = true;
      }
      board[row] = newRow;
  }
  return moved;
}

function moveRight() {
  let moved = false;
  for (let row = 0; row < SIZE; row++) {
      const originalRow = [...board[row]];
      board[row] = board[row].reverse();
      let newRow = combineRow(board[row]);
      board[row] = newRow.reverse();
      if (JSON.stringify(newRow) !== JSON.stringify(originalRow)) {
          moved = true;
      }
  }
  return moved;
}

function moveUp() {
  let moved = false;
  for (let col = 0; col < SIZE; col++) {
      const originalCol = board.map(row => row[col]);
      let newCol = combineRow(originalCol);
      if (JSON.stringify(newCol) !== JSON.stringify(originalCol)) {
          moved = true;
      }
      for (let row = 0; row < SIZE; row++) {
          board[row][col] = newCol[row];
      }
  }
  return moved;
}

function moveDown() {
  let moved = false;
  for (let col = 0; col < SIZE; col++) {
      const originalCol = board.map(row => row[col]);
      let newCol = combineRow(originalCol.reverse());
      if (JSON.stringify(newCol.reverse()) !== JSON.stringify(originalCol)) {
          moved = true;
      }
      for (let row = 0; row < SIZE; row++) {
          board[row][col] = newCol[row];
      }
  }
  return moved;
}

function move(direction) {
  let moved = false;   //to check later if its not buggy
  switch (direction) {
      case 'up':
          moved = moveUp();
          break;
      case 'down':
          moved = moveDown();
          break;
      case 'left':
          moved = moveLeft();
          break;
      case 'right':
          moved = moveRight();
          break;
  }
  if (moved) {
      addRandomTile();
      updateBoard();
      if (isGameOver()) {
          alert('Game Over!');
      }
  }
}

function combineRow(row) {
  let newRow = row.filter(val => val !== 0);
  for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] === newRow[i + 1]) {
          newRow[i] *= 2;
          score += newRow[i];
          newRow.splice(i + 1, 1);
      }
  }
  while (newRow.length < SIZE) {
      newRow.push(0);
  }
  return newRow;
}

function resetGame() {
  board.forEach(row => row.fill(0));
  score = 0;
  addRandomTile();
  addRandomTile();
  updateBoard();
}
