let socket = io(); //4.load socket.io (that is in the index.html) for the client side;
let myColor = "white";

//print the connection on the client side
socket.on("connect", newConnection); //=when the "connect" message is received, execute the function newConnection;
function newConnection() {
  console.log("your id: " + socket.id);
}

//set brush color
socket.on("color", setColor); //=when the "color" message is received from the server, execute setColor;
function setColor(assignedColor) {  //(data from the message)
  myColor = assignedColor;
}


//broadcast what other clients are drawing
socket.on("mouseBroadcast", drawOtherMouse); //=when another client broadcasts the mouse data, execute drawOtherMouse;
function drawOtherMouse(data) { //data is the message of the mouse position sent from another client to the server and then broadcasted to the other clients;
  fill(data.color);
  noStroke();
  ellipse(data.x, data.y, 20);
}


function preload(){
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  background("AliceBlue");
}

function draw() {
}

function mouseMoved() { //=when the mouse is moved...
  fill(myColor);
  noStroke();
  ellipse(mouseX, mouseY, 20); //...a sketch happens on the client side...
  let message = {
    x: mouseX,
    y: mouseY,
    color: myColor,
  }; //..and a message..
  socket.emit("mouse", message) //..is sent to the server, through my instance of socket.io..
}
