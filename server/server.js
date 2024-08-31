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
app.use(cors({
  origin: 'http://localhost:8080' 
}));

// create HTTP server using Express app
const server = createServer(app);
// attach socket.io to the server
const io = new Server(server, {
  cors: {
      origin: 'http://localhost:8080', 
      methods: ['GET', 'POST'],
  },
});

// handle socket.io connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // handle username(testing before db)
  socket.on('set username', (username) => {
    console.log('username created:', username);
    socket.username = username;
  });

  // handle messages
  socket.on('chat message', (msg) => {
    console.log('Message received on server:', msg);
    const timestamp = new Date().toLocaleString();
    io.emit('chat message', { user: socket.username, message: msg, msgtime: timestamp });
  });

  //handle socket.io disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});




server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});