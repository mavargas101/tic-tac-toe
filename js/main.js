
//TicTacToe board consists of 9 squares
//Each square can be empty, X, O
//There are two players
//Turn is decided by turnCount % 2 == 0 for X(player1) and turnCount % 2 == 0 for O(player2)
//Winner is chosen when 3 adjacent symbols are detected

// X goes first per 'official' game rules

// Turn Flow:
// 1. Check who's turn it is
// 2. Wait for player input
// 3. Once there is player input, display correct symbol on correct square.
// 4. Check if someone won 
//   4a. if true, break out of loop and announce winner
//   4b. if false, continue loop and increment turnCount by 1



class Game {
    constructor(player1, player2, board) {
      this.player1 = player1; //holds player1
      this.player2 = player2; //holds player2
      this.board = board; // holds board
      this.turn = this.player1; // keeps track of whos turn it is
      this.turnCounter = 0;
      this.board.board.forEach(row => row.forEach(square => {square.domObject.addEventListener('click', () => this.select(this.turn, square))}))
      this.winCombos = [[{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}],
    [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}],
    [{x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}],
    [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}],
    [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}],
    [{x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}],
    [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}],
    [{x: 0, y: 2}, {x: 1, y: 1}, {x: 2, y: 0}]];
    }
    changeTurn(){ //changes the player's turn
      if(this.turn === this.player2){    this.turn = this.player1;  }
      else{ this.turn = this.player2; }
    }
    select(player, square){ // runs when a square is clicked, changse the square's state to the respective player's turn
      square.state = player.symbol;
      this.board.updateSquare(square);
      this.changeTurn();
      this.turnCounter += 1;
      this.checkWin();
    }
    reset(){
      this.board.resetBoard();
      this.turn = this.player1;
      this.turnCounter = 0;
    }
    checkWin(){
  
      for(const combo of this.winCombos){
        let player1Score = 0;
        let player2Score = 0;
        let winnerX = [];
        let winnerO = [];
        for(const combo2 of combo){
          if(this.board.board[combo2.x][combo2.y].state === 'X'){
            player1Score += 1;
            winnerX.push(this.board.board[combo2.x][combo2.y])
            if(player1Score == 3){
              for(let square of winnerX){
                square.domObject.classList.add('winner');
              }
              return this.winnerFound(this.player1);
            }
          }else if(this.board.board[combo2.x][combo2.y].state === 'O'){
            player2Score += 1;
            winnerO.push(this.board.board[combo2.x][combo2.y])
            if(player2Score == 3){
              for(let square of winnerO){
                square.domObject.classList.add('winner');
              }
              return this.winnerFound(this.player2)
            }
          }
        }
      }
      if(this.turnCounter === 9){
        return this.drawFound();
      }
    }
    checkDraw(){
      let counter = 0;
      for(const row of this.board.board){
        for(const square of row){
          if(square.state != ""){
            counter += 1;
          }
        }
      }
      if(counter === 9){
        return this.drawFound();
      }
    }
    winnerFound(player){
      for(const row of this.board.board){
        for(const square of row){
          square.domObject.setAttribute('disabled', true);
        }
      }
      openModal(`${player.symbol} WINS!`);
      console.log();
    }
    drawFound(){
      openModal(`DRAW!`);
    }
  
  }
  class Board {
    constructor() {
      this.board = [  //creates a 2d array of the game board
        [new Square(), new Square(), new Square()],
        [new Square(), new Square(), new Square()],
        [new Square(), new Square(), new Square()]
      ];
      this.squaresInDocument = document.querySelectorAll('.square'); //holds reference to squares in the DOM
      this.squaresInDocument.forEach(element => { // links dom object to board
        for (let i = 0; i < this.board.length; i++) {
          let row = this.board[i];
          let selected = false;
          for (let j = 0; j < row.length; j++) {
            if (row[j].domObject != "") {
              continue;
            }
            row[j].domObject = element;
            selected = true;
            break
          }
          if (selected) {
            break;
          }
        }
      });
  
    }
    updateSquare(square){ //updates square to selected state
      square.domObject.innerText = square.state ;
      square.domObject.setAttribute('disabled', true);
      square.domObject.classList.add('selected');
    }
    resetBoard(){
      for(let row of this.board){
        for(let square of row){
          square.state = ''; 
          square.domObject.innerText = ""; 
          square.domObject.removeAttribute('disabled');
          square.domObject.classList.remove('selected');
          square.domObject.classList.remove('winner');
          closeModal();
        }
      }
    }
  }
  class Square {
    constructor() {
      this.state = ""; //can be empty, X, or O
      this.domObject = ""; //holds reference to the object in the dom;
    }
  }
  
  let winCombos = [[{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}]]
  //player object - 
  //track where they made their moves
  class Player {
    constructor(playerNumber, symbol) {
      //track wins
      this.wins = 0;
      this.playerNumber = playerNumber;
      this.symbol = symbol;
    }
  }
  // modules: ?
  
  const player1 = new Player(0, 'X');
  const player2 = new Player(1, 'O');
  const board = new Board();
  const game = new Game(player1, player2, board);
  
  const modal = document.querySelector(".modal");
  const modalText = document.querySelector('.modal-text');
  const modalButton = document.querySelector('.modal-button');
  modalButton.addEventListener('click', () => game.reset());
  const overlay = document.querySelector("#overlay");
  
  function openModal(message){
    modal.classList.add('active');
    overlay.classList.add('active');
    modalText.innerHTML = `${message}`;
  }
  function closeModal(){
    modal.classList.remove('active');
    overlay.classList.remove('active');
  }