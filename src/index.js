const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

io.on('connection', socket => {
  socket.emit('message', 'Welcome!');

  socket.on('sendMessage', (msg, callback) => {
    const filter = new Filter();
    if (filter.isProfane(msg)) {
      return callback('Profanity isnt allowed!');
    }
    socket.emit('message', msg);
    callback();
  });

  socket.on('sendLocation', (position, callback) => {
    socket.broadcast.emit(
      'message',
      `A new user joined from  ${(position.latitude, position.longitude)}`
    );
  });

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left');
  });
});

server.listen(port, () => {
  console.log('Hi');
});
