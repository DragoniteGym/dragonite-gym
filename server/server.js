const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('../db_models/pool.js')

// import http module
const { createServer } = require('http');
// import socket.io
const { Server } = require('socket.io');
//import auth routes
const authRoutes = require('./routes/auth');
//import env var
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: 'http://localhost:8080',
  })
);

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

  // const session = socket.request.session;

  // if (!session.user) {
  //   socket.disconnect();
  //   return;
  // }

  // use user info stored in session
  // const username = session.user.username;
  // console.log(`${username} connected`);

  // handle username(testing before db)
  socket.on('set username', (username) => {
    console.log('username created:', username);
    socket.username = username;
  });

  // handle messages
  socket.on('chat message', ({ message }) => {
    const username = socket.username;
    console.log(`${username} sent a message: ${message}`);
    const messageData = {
      username: username,
      message: message,
      timestamp: new Date().toLocaleString(),
    };

    io.emit('chat message', messageData);
  });

  //handle socket.io disconnect
  socket.on('disconnect', () => {
    const username = socket.username;
    console.log(`${username} disconnected`);
  });
});

//use auth routes
app.use('/api/auth', authRoutes);

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
      console.error('Error executing query', err.stack);
  } else {
      console.log('Query result:', res.rows);
  }
});

console.log('Database configuration:', {
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  host: process.env.POSTGRES_HOST
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
