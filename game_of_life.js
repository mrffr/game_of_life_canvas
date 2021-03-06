"use strict";

//using module style namespace
var GameOfLifeNamespace = GameOfLifeNamespace || {};

GameOfLifeNamespace.Module = function()
{
  var canvas = document.getElementById("gameCanvas");
  var context = canvas.getContext("2d");

  context.canvas.width = window.innerWidth - 12;
  context.canvas.height = 800;

  /* Board object */
  var myBoard = {
    cols : 20,
    rows : 20,
    board : new Array(400),

    updateBoard : function(){
      var boardCopy = this.board.slice();
      var neigh_pos = [
        [-1, -1], [-1, 0], [-1, 1],
        [ 0, -1],          [ 0, 1],
        [ 1, -1], [ 1, 0], [ 1, 1]
      ];

      for(var i = 0; i<this.rows; i++){
        for(var j=0;j<this.cols; j++){
          var neighbours = 0;

          for(var e = 0; e < neigh_pos.length; e++){
            var xx = j + neigh_pos[e][0];
            var yy = i + neigh_pos[e][1];
            if(yy >= 0 && yy < this.rows && xx >= 0 && xx < this.cols){
              if(this.board[(yy * this.cols) + xx] == 1){
                neighbours ++;
              }
            }
          }

          var pos = (i*this.cols) + j;
          //rules
          if(this.board[pos] == 0 && neighbours == 3){
            boardCopy[pos] = 1; //reproduction
          }else if(this.board[pos] == 1){
            if(neighbours < 2){
              boardCopy[pos] = 0; //under pop
            }else if(neighbours <= 3){
              boardCopy[pos] = 1; //lives on
            }else{
              boardCopy[pos] = 0; //overcrowd
            }
          }
        }
      }

      this.board = boardCopy.slice();
    },

    fillBoard : function(){
      for(var i=0;i<this.rows;i++){
        for(var j=0;j<this.cols;j++){
          var pos = (i * this.cols) + j;
          if(Math.random() >= 0.5){
            this.board[pos] = 1;
          }else{
            this.board[pos] = 0;
          }
        }
      }
    }
  };

  function drawRectangle(x, y, w, h, alive, context){
    context.beginPath();
    if(alive == 1){
      context.fillStyle = "black";
    }else{
      context.fillStyle = "white";
    }
    context.rect(x, y, w, h);
    context.fill();
    context.stroke();
  };


  function drawCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    /* Draw the board */
    var w = context.canvas.width / myBoard.cols;
    var h = context.canvas.height / myBoard.rows;
    for(var i=0; i<myBoard.rows; i++){
      for(var j=0; j<myBoard.cols; j++){
        drawRectangle(j*w, i*h, w, h, myBoard.board[(i*myBoard.cols) + j], context);
      }
    }
  };

  function runGame(){
    myBoard.updateBoard();
    drawCanvas();
  };

  /* allowing drawing multiple cells as long as mouse button held down */
  canvas.addEventListener("mousedown", toggleFillCell, false);
  canvas.addEventListener("mouseup", toggleFillCell, false);

  var drag = false;
  function toggleFillCell(event){
    if(event.type === "mousedown"){ 
      drag = true;
    }else{
      drag = false;
    }
  }

  canvas.addEventListener("mousemove", fillCell, false);
  /* mouse down should fill the cell even if we don't move the mouse */
  canvas.addEventListener("mousedown", fillCell, false);

  /* manually filling cells */
  function fillCell(event){
    if(drag == false){ return; }
    var x = event.x - canvas.offsetLeft;
    var y = event.y - canvas.offsetTop;

    var w = context.canvas.width / myBoard.cols;
    var h = context.canvas.height / myBoard.rows;

    var j = Math.floor(x / w);
    var i = Math.floor(y / h);

    myBoard.board[i*myBoard.cols + j] = 1;
    drawCanvas();
  };

  /* button functions */
  var interv;
  /* button toggles state start/stop */
  function clickButton() {
    var button = document.getElementById("startButton");
    if(button.innerText == "Start"){
      button.innerText = "Stop";
      runGame();
      interv = setInterval(runGame, 1000);
    }else{
      button.innerText = "Start";
      clearInterval(interv);
    }
  };

  /* randomly fill board */
  function clickRandButton(){
    var button = document.getElementById("randButton");
    myBoard.fillBoard();
    drawCanvas();
  };

  var oPublic = {
    clickButton : clickButton,
    clickRandButton : clickRandButton,
    drawCanvas : drawCanvas
  };
  return oPublic;
}();
