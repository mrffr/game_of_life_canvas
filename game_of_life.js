var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;

function drawRectangle(x, y, w, h, alive, context){
  context.beginPath();
  context.rect(x, y, w, h);
  if(alive == 1){
    context.fillStyle = "#8ED6FF";
  }else{
    context.fillStyle = "#000000";
  }
  context.fill();
  context.stroke();
}

function drawBoard(myBoard, context){
}

function updateBoard(myBoard){
}

function drawCanvas(myBoard, canvas, context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard(myBoard, context);
    updateBoard(myBoard);
}

var myBoard = {
    cols : 20,
    rows : 20,
    board : new Array(400)
};

function fillBoard(myBoard){
}
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
