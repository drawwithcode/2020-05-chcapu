let socket = io(); //4.load socket.io (that is in the index.html) for the client side;

//print the connection on the client side
socket.on("connect", newConnection); //=when the "connect" message is received, execute the function newConnection;
function newConnection() {
  console.log("your id: " + socket.id);
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
  ellipse(mouseX, mouseY, 20); //...a sketch happens on the client side...
  let message = {
    x: mouseX,
    y: mouseY,
  }; //..and a message..
  socket.emit("mouse", message) //..is sent to the server, through my instance of socket.io..
}
