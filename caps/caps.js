'use strict';

require('dotenv').config();

const net = require('net');
const server = net.createServer();


const PORT = process.env.PORT || 3000;

let socketPool = {};

server.listen(PORT, () => console.log(`Server is up on ${PORT}`));

server.on('connection', (socket) => {

  const id = `Socket-${Math.random()}`;
  console.log(`client with ID : ${id} is connected!!! `);

  socketPool[id] = socket;

  socket.on('data', (buffer) => dispatchEvent(buffer));
  socket.on('error', (e) => console.log('SOCKET ERR', e));
  socket.on('end', (end) => console.log('connection ended', end));
});

server.on('error', (e) => {
  console.log('SERVER ERROR', e);
});

let aloowEvent = ['in-transit', 'pickup', 'delivered'];

function dispatchEvent(buffer) {

  var time = new Date();
  let raw = buffer.toString().trim();
  let message = JSON.parse(raw);
  let { event, payload } = message;
  if (aloowEvent.includes(event)) {
    console.log(`EVENT: ${event} `, { payload, time });
    for (let socket in socketPool) {
      socketPool[socket].write(raw);
    }

  } else {
    console.log('IGNOR', event);

  }
}