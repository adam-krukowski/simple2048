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
