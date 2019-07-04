// FileName: server.js
// Import express
//express is a web frame for node js
const express = require('express')
const app = express();
// Import http
const http = require('http');
// Import Body parser
let bodyParser = require('body-parser');
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true
}));
//bodyParser.json() throws syntax error on invalid json
app.use(bodyParser.json());
//import express validator
var expressValidator = require('express-validator')
//calling express validator
app.use(expressValidator());
// Import Mongoose
const mongoose = require('mongoose');
const route = require('../backend/api-routes');
// Setup server port
var port = process.env.PORT || 8080;
// Launch app to listen to specified port
var server = app.listen(port, () => {
  console.log("Running RestHub on port " + port);
  //process.exit();
});
var chatController = require('../backend/controller/chatController');
app.use(express.static('../frontend'));
const io = require('socket.io')(server);
//connections = [];
//checking for events. connecton will be listening for incoming sockets.
io.on('connection', function (socket) {
  console.log("socket is connected ");
  //started listening events. socket.on waits for the event. whenever that event is triggered the callback
  //function is called.
  //connections.push(socket)
  socket.on('createMessage', function (message) {
    //saving message to db
    chatController.message(message, (err, data) => {
      if (err) {
        console.log("Error:in message", err);
      }
      else {
        //io.emmit is used to emit the message to all sockets connected to it.
        io.emit('newMessageSingle', message);
      }
    });
    // socket emmits disconnect event which will be called whenever client disconnected.
    socket.on('disconnect', function () {
      console.log('socket is disconnect');
    });
  });
});
//calling router
app.use('/', route);
app.use(express.static('../frontend'));
//import database config
const mdbConfig = require('./config/database.js');
//connection to database
mongoose.connect(mdbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to database...!");
}).catch(err => {
  console.log("Could not connect to the database....!");
  process.exit();
})