////////////////
////////Variables
////////////////
//Game Container Variables
let cells = document.querySelectorAll('.cell'); 
let cell = document.querySelector('.cell'); 
let players = document.querySelector('.players'); 
let gameContainer = document.querySelector('.game-container'); 
let gameTitle = document.querySelector('.game-title');
//Result Box and Playboard Variables
let playBoard = document.querySelector('.play-board');
let resultBox = document.querySelector('.result-box');
let buttons = document.querySelector('.buttons');
let wonText = document.querySelector('.won-text'); 
let closeBtn = document.querySelector('.btn-close');
//Select box Variables
const selectBox = document.querySelector('.select-box');
let selectXBtn = selectBox.querySelector('.playerX');
let selectOBtn = selectBox.querySelector('.playerO');
//Prev, Reload, Next buttons
let prevBtn = document.querySelector('.prev');
let reloadBtn = document.querySelector('.reload');
let nextBtn = document.querySelector('.next');
//Javascript Variables
let playerX = true; // currentPlayer (X)
let gameActive = true; //pause the game
let drawCounter = 0; //draw the game
let movePosition = 0;
let movements = [];

//show game container 
let show = () => {
  selectBox.classList.add('hide'); //hide the select box on playerX button clicked
  gameContainer.classList.add('show'); //show game container
  gameTitle.classList.add('show'); //show game title
  playBoard.classList.add('show'); //show playboard
};

//hide game container
let hide = () => {
  gameContainer.classList.remove('show'); //show game container
  gameTitle.classList.remove('show'); //show game title
  playBoard.classList.remove('show'); //show playboard
};

//close result box
//show game container 
closeBtn.addEventListener('click', () => {
  resultBox.classList.remove('show');
  gameContainer.classList.add('show'); //show game container
  gameTitle.classList.add('show'); //show game title
  buttons.classList.add('show'); //show buttons (prev, reload, next);
});

//when window is loaded 
window.onload = () => {
  selectXBtn.onclick = () => {
    show();
  };
  selectOBtn.onclick = () => {
    show();
    players.setAttribute('class', 'players active player'); //adding active and player class name 
    playerX = !playerX;
  };
};

//loop to all the cells and add click event
function game() {
  cells.forEach(cell => {
    cell.addEventListener('click', cellClick);
  });
}

//Add X and O on cell when clicked
function cellClick() {
  let mark = '';
  if (playerX === true) {
    mark = 'x';
    this.innerText = `x`; //Add X when player is true
    this.style.backgroundColor = '#fe5c5c'; //change the background color to red
    this.style.pointerEvents = 'none';
    players.classList.add('active');
  } else {
    mark = 'o';
    this.innerText = `o`; //Add O when player is false
    this.style.backgroundColor = '#ffbf00'; //change the background color to red
    this.style.pointerEvents = 'none';
    players.classList.remove('active');
  }
  playerX = !playerX;
  saveMove();
  resultValidation(mark);
};

//game storage
let gameState = [];

//save every move in an array
function saveMove() {
  let row1 = [];
  let row2 = [];
  let row3 = [];

  cells.forEach((cell, i) => {
    if (i < 3) { //if index is 0,1,2
      row1.push(cell.innerHTML);
    } else if (i >= 3 && i <= 5) { //if index is 3,4,5
      row2.push(cell.innerHTML);
    } else { //if index is 6,7,8
      row3.push(cell.innerHTML);
    }
  })
  gameState.push([
    row1,
    row2,
    row3
  ]);
  movePosition = gameState.length;
  console.log({gameState, movePosition});
};

//winning conditions
const winningConditions = [
  [0, 1, 2], 
  [3, 4, 5], 
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8], 
  [6, 4, 2] 
];

let winIndex;

// Check if the current player won the game
function resultValidation(playerMark) {
  // let roundWon = false;
  for (let i = 0; i < cells.length; i++) { //loop all the element cell
    // let winCondition = winningConditions[i];
    for (let j = 0; j < winningConditions.length; j++) { //loop over winning conditions
      for (let k = 0; k < winningConditions[j].length; k++) {
        let a = cells[winningConditions[j][0]].innerText;
        let b = cells[winningConditions[j][1]].innerText;
        let c = cells[winningConditions[j][2]].innerText;
        if (a === playerMark && b === playerMark && c === playerMark) {
          cells[winningConditions[j][0]].style.backgroundColor = '#022d36';
          cells[winningConditions[j][1]].style.backgroundColor = '#022d36';
          cells[winningConditions[j][2]].style.backgroundColor = '#022d36';
          winIndex = j;
          console.log(winIndex);
          hide();
          resultBox.classList.add('show');
          wonText.innerText = `${playerMark} won`;
          gameContainer.style.pointerEvents = 'none';
          return;
        } 
      }
    } 
  }
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].innerText !== '') {
      drawCounter++;
    } 
  }
  if (drawCounter === 9) {
    hide();
    resultBox.classList.add('show');
    wonText.innerText = `Draw`;
  }
  drawCounter = 0;
};

//get the state of the game and create a new span
function newSpan() {
  for (let i = 0; i < gameState[movePosition].length; i++) {
    let section = document.createElement('section');
    for (let j = 0; j < gameState[movePosition][i].length; j++) {
      let span = document.createElement('span');
      span.classList.add('cell');
      span.innerText = gameState[movePosition][i][j];
      if (gameState[movePosition][i][j] === 'x') {
        span.style.backgroundColor = '#fe5c5c'; //change the background color to red
        span.style.pointerEvents = 'none';
      } else if ( gameState[movePosition][i][j] === 'o' ) {
        span.style.backgroundColor = '#ffbf00'; //change the background color to red
      } else {
        span.style.backgroundColor = '#add8e6';
      }
      section.appendChild(span);
    }
    gameContainer.append(section);
  };
};




//preview button: undo last move 
function previouseMove(e) {
  nextBtn.style.color = 'black';
  if (movePosition <= 0) {
    e.target.style.opacity = '0.5';
    return;
  }
  gameContainer.innerHTML = '';
  movePosition -= 1;
  newSpan();
};

//next button: view next move
function nextMove(e) {
  prevBtn.style.color = 'black';
  if (movePosition === gameState.length - 1) {
    e.target.style.color = 'gray';
    return;
  }
  gameContainer.innerHTML = '';
  movePosition += 1;
  newSpan();
  let newCells = document.querySelectorAll('.cell');
  if (winIndex != undefined) {
    winningConditions[winIndex].forEach(value => {
      newCells[value].style.backgroundColor = '#022d36';
    })
  }
};

prevBtn.addEventListener('click', previouseMove);
nextBtn.addEventListener('click', nextMove);

game();