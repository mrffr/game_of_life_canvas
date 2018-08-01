var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;

function drawCanvas(myBoard, canvas, context) {
  context.clearRect(0, 0, canvas.width, canvas.height);
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
