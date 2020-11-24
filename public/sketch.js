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
