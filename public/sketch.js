let socket = io(); //4.load socket.io (that is in the index.html) for the client side;

//--SKETCH FATTO IN AULA RICREATO--
//let myColor = "white";

let easy;
let lovey;
let mad;
let moody;
let sick;

let myMood;
let message;

let jost;


//print the connection on the client side
socket.on("connect", newConnection); //=when the "connect" message is received, execute the function newConnection;
function newConnection() {
  console.log("your id: " + socket.id);
}

//--SKETCH FATTO IN AULA RICREATO--
//set brush color
  // socket.on("color", setColor); //=when the "color" message is received from the server, execute setColor;
  // function setColor(assignedColor) {  //(data from the message)
  //   myColor = assignedColor;
  // }

//set starting mood
socket.on("mood", setMood); //=when the "color" message is received from the server, execute setColor;
function setMood(assignedMood) {  //(data from the message)
  myMood = loadImage("./assets/emojis/" + assignedMood + ".png");
}

//--SKETCH FATTO IN AULA RICREATO--
//broadcast what other clients are drawing
  // socket.on("mouseBroadcast", drawOtherMouse); //=when another client broadcasts the mouse data, execute drawOtherMouse;
  // function drawOtherMouse(data) { //data is the message of the mouse position sent from another client to the server and then broadcasted to the other clients;
  //   fill(data.color);
  //   noStroke();
  //   ellipse(data.x, data.y, 20);
  // }


function preload() {
  easy = loadImage("./assets/emojis/easy.png");
  lovey = loadImage("./assets/emojis/lovey.png");
  mad = loadImage("./assets/emojis/mad.png");
  moody = loadImage("./assets/emojis/moody.png");
  sick = loadImage("./assets/emojis/sick.png");

  jost = loadFont('./assets/Jost-Regular.ttf');
}

//broadcast other clients drawings and make them all hearts
socket.on("mouseBroadcast", drawOtherMouse);
function drawOtherMouse(data) {
 imageMode(CENTER);
 image(lovey, data.x, data.y, 29, 29);
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  background("AliceBlue");

  push();
  let intro = "Express your feelings, get nothing but love back!"
  fill(0);
  textSize(24);
  textFont(jost);
  textAlign(CENTER);
  text(intro,width/2,60);
  pop();

  push();
  let choice = "How do you feel today? [c]:🤙🏻 [v]:💜 [b]:😡 [n]:🌧 [m]:🦠";
  textSize(18);
  textFont(jost);
  textAlign(CENTER);
  text(choice,width/2,height-90);
  pop();

  push();
  let instruction = "CLICK AND DRAW, SOMEONE MIGHT REPLY...";
  textSize(11);
  fill("DodgerBlue");
  textFont(jost);
  textAlign(CENTER);
  text(instruction,width/2,height-50);
  pop();
}


function draw() {
}


//--SKETCH FATTO IN AULA RICREATO--
// function mouseMoved() { //=when the mouse is moved...
//   fill(myColor);
//   noStroke();
//   ellipse(mouseX, mouseY, 20); //...a sketch happens on the client side...
//   let message = {
//     x: mouseX,
//     y: mouseY,
//     color: myColor,
//   }; //..and a message..
//   socket.emit("mouse", message) //..is sent to the server, through my instance of socket.io..
// }

function mousePressed() {
  imageMode(CENTER);
  image(myMood,mouseX,mouseY,29,29);
  message = {
    x: mouseX,
    y: mouseY,
  };
  socket.emit("mouse", message);
}

function mouseDragged() {
  imageMode(CENTER);
  image(myMood,mouseX,mouseY,29,29);
  message = {
    x: mouseX,
    y: mouseY,
  };
  socket.emit("mouse", message);
}

function keyPressed() {
  console.log(key);
  if(key === "c"){
    myMood = easy;
  } if (key === "v") {
    myMood = lovey;
  } if (key === "b") {
    myMood = mad;
  } if (key === "n") {
    myMood = moody;
  } if (key === "m") {
    myMood = sick;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background("AliceBlue");

  push();
  let intro = "Express your feelings, get nothing but love back!"
  fill(0);
  textSize(24);
  textFont(jost);
  textAlign(CENTER);
  text(intro,width/2,60);
  pop();

  push();
  let choice = "How do you feel today? [c]:🤙🏻 [v]:💜 [b]:😡 [n]:🌧 [m]:🦠";
  textSize(18);
  textFont(jost);
  textAlign(CENTER);
  text(choice,width/2,height-90);
  pop();

  push();
  let instruction = "CLICK AND DRAW, SOMEONE MIGHT REPLY...";
  textSize(11);
  fill("DodgerBlue");
  textFont(jost);
  textAlign(CENTER);
  text(instruction,width/2,height-50);
  pop();
}
