var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;

function drawCanvas(myBoard, canvas, context) {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function clickButton() {
    var button = document.getElementById("startButton");
  if(button.innerText == "Start"){
      button.innerText = "Stop";
  }else{
    button.innerText = "Start";
  }
};
