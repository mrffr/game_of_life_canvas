var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;

function drawRectangle(x, y, w, h, alive, context){
  context.beginPath();
  context.rect(x, y, w, h);
  if(alive == 1){
    context.fillStyle = "#FFFFFF";
  }else{
    context.fillStyle = "#000000";
  }
  context.fill();
  context.stroke();
}

function drawBoard(myBoard, context){
  var w = context.canvas.width / myBoard.cols;
  var h = context.canvas.height / myBoard.rows;
  for(i=0; i<myBoard.rows; i++){
    for(j=0; j<myBoard.cols; j++){
      drawRectangle(j*w, i*h, w, h, myBoard.board[(i*myBoard.cols) + j], context);
    }
  }
}

function updateBoard(myBoard){
    var boardCopy = myBoard.board.slice();
  for(i = 0; i<myBoard.rows; i++){
      for(j=0;j<myBoard.cols; j++){
      }
  }

  myBoard.board = boardCopy.slice();
}

function drawCanvas(myBoard, canvas, context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard(myBoard, context);
    updateBoard(myBoard);
}

function fillBoard(myBoard){
  for(i=0;i<myBoard.rows;i++){
    for(j=0;j<myBoard.cols;j++){
      var pos = (i * myBoard.cols) + j;
      if(Math.random() >= 0.5){
        myBoard.board[pos] = 1;
      }else{
        myBoard.board[pos] = 0;
      }
    }
  }
}

var myBoard = {
    cols : 20,
    rows : 20,
    board : new Array(400)
};

fillBoard(myBoard);

var interv;
function clickButton() {
    var button = document.getElementById("startButton");
  if(button.innerText == "Start"){
      button.innerText = "Stop";
      fillBoard(myBoard);
      drawCanvas(myBoard, canvas, context);
      interv = setInterval(drawCanvas, 1000, myBoard, canvas, context);
  }else{
      button.innerText = "Start";
      clearInterval(interv);
  }
};
