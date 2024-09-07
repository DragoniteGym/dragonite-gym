const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('../db_models/pool.js')
const jwt = require('jsonwebtoken');

// import http module
const { createServer } = require('http');
// import socket.io
const { Server } = require('socket.io');
//import auth routes
const authRoutes = require('./routes/auth');
//import env var
require('dotenv').config();
//import exercise routes
const exerciseRoutes = require('./routes/exercise');
//import saved workout routes
const savedWorkoutRoutes = require('./routes/savedWorkouts.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true
  })
);

// create HTTP server using Express app
const server = createServer(app);
// attach socket.io to the server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware to verify JWT
const authenticateSocket = (socket, next) => {
  const token = socket.handshake.query.token;

  if (!token) return next(new Error('Authentication error'));

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(new Error('Authentication error'));

    socket.user = decoded;
    next();
  });
};

// Apply middleware for Socket.IO
io.use(authenticateSocket);

// handle socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');
  const username = socket.user.username;

  if (!username) {
    socket.disconnect();
    return;
  }

  console.log(`${username} connected`);

  socket.on('chat message', (msg) => {
    console.log('emitting chat message:', msg);
    const messageData = {
      username: socket.user.username,
      message: msg.message,
      timestamp: new Date().toLocaleString(),
    };
    console.log('username', username);
    console.log('message:', messageData.message);
    io.emit('chat message', messageData);
  });

  socket.on('disconnect', () => {
    console.log(`${username} disconnected`);
  });
});

//use auth routes
app.use('/api/auth', authRoutes);

//use exercise routes
app.use('/api/exercise', exerciseRoutes);

//use saved workout routes
app.use('/api/savedWorkouts', savedWorkoutRoutes);

console.log('Database configuration:', {
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  host: process.env.POSTGRES_HOST
});

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occured' },
  };

  const errorObj = Object.assign(defaultErr, err);

  res.status(errorObj.status).json(errorObj.message);
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
