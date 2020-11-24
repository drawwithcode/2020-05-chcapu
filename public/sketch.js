let socket = io(); //4.load socket.io (that is in the index.html) for the client side;

//print the connection on the client side
socket.on("connect", newConnection); //=when the "connect" message is received, execute the function newConnection;
function newConnection() {
  console.log("your id: " + socket.id);
}

socket.on("mouseBroadcast", drawOtherMouse); //=when another client broadcasts the mouse data, execute drawOtherMouse;
function drawOtherMouse(data) { //data is the message of the mouse position sent from another client to the server and then broadcasted to the other clients;
  fill("yellow");
  ellipse(data.x, data.y, 20);
}

function preload(){
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  background("purple");
}

function draw() {
}

function mouseMoved() { //=when the mouse is moved...
  fill("white");
  ellipse(mouseX, mouseY, 20); //...a sketch happens on the client side...
  let message = {
    x: mouseX,
    y: mouseY,
  }; //..and a message..
  socket.emit("mouse", message) //..is sent to the server, through my instance of socket.io..
}
