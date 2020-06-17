'use strict';

const io = require('socket.io')(3000);

io.on('connection', (socket) => {
  console.log(`CONNECTED ${socket.id}`);
});

const caps = io.of('/caps');
caps.on('connection', (socket) => {
  console.log('welcome dear customers');
  console.log(`CONNECTED ${socket.id}`);

  socket.on('join', (room) => {
    console.log('register as', room);
    socket.join(room);
  });
  socket.on('pickup', (payload) => {
    render('pickup', payload);
    caps.emit('pickup', payload);
  });
  socket.on('in-transit', (payload) => {
    render('in-transit', payload);
    caps.to(payload.store).emit('in-transit', payload);
  });
  socket.on('delivered', (payload) => {
    render('delivered', payload);
    caps.to(payload.store).emit('delivered', payload);
  });
});

function render(event, payload) {
  let time = new Date();
  console.log({ event, payload, time });

}