console.log("node is running");

//1.create a local server (express-app-port-server): use express to setup a server app running on server side;
let express = require("express"); //1.
let socket = require("socket.io"); //3.create a web socket (socket-io): use socket to enable the server to communicate with the client;
let app = express(); //1.
let port = 3000; //1.
let server = app.listen(port); //1.
app.use(express.static("public")); //2.send the public folder to the client
let io = socket(server); //3.

//print the connection on the server side
io.on("connection", newConnection); //=on the event "connection", execute the function newConnection
function newConnection(socket) {  //function executed everytime a new client connection is created
  console.log("new connection: " + socket.client.id); //to read the connection ID of every client on the server;
}
