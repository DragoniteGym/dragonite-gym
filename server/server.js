const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// import http module
const { createServer } = require('http');
// import socket.io
const { Server } = require('socket.io');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// create HTTP server using Express app
const server = createServer(app);
// attach socket.io to the server
const io = new Server(server);


// handle socket.io connections
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat meassage', (msg) => {
    console.log('Message received: ' + msg);
    io.emit('chat message', msg);
  });

  //handle socket.io disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});





server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});