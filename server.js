console.log("node is running");

//1.create a local server (express-app-port-server): use express to setup a server app running on server side;
let express = require("express"); //1.
let socket = require("socket.io"); //3.create a web socket (socket-io): use socket to enable the server to communicate with the client;
let app = express(); //1.
let port = process.env.PORT || 3000; //1.
let server = app.listen(port); //1.
app.use(express.static("public")); //2.send the public folder to the client
let io = socket(server); //3.

//print the connection on the server side
io.on("connection", newConnection); //=on the event "connection", execute the function newConnection
function newConnection(socket) {  //function executed everytime a new client connection is created
  console.log("new connection: " + socket.client.id); //to read the connection ID of every client on the server;


//////////////////////

//client color
  let clientColor = getRandomColor();
  socket.emit("color", clientColor); //tell to the specific client a message titled "color", which tells the color that the function getRandomColor generated;

//broadcast the data received by the client to all the others
  socket.on("mouse", mouseMessage); //=when you get the message "mouse", execute mouseMessage;
  function mouseMessage(dataReceived) { //the mouseMessage function takes the received data and..
    console.log(socket.client.id, dataReceived); //..prints it on the server side with the id of the client that sent the data.. (when the client moves the mouse, the server prints the x and y positions; so the client sends a message to the server);
    socket.broadcast.emit("mouseBroadcast", dataReceived); //..and broadcasts to all the other connections, excluding the one that sent it.
  }
}

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for(var i=0; i<6; i++) {
    color += letters[Math.floor(Math.random()*16)];
  }
  return color;
}
