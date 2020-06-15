'use strict';

require('dotenv').config();

const net = require('net');
const server = net.createServer();

var time = new Date();
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

function dispatchEvent(buffer) {

  let payload = JSON.parse(buffer.toString().trim());
  pickUpHandler('pickup', payload);
  setTimeout(() => {
    inTransitHanndler('in-transit', payload);
  }, 1000);
  setTimeout(() => {
    deliverdHandler('delivered', payload);
  }, 3000);
}

function broadcast(msg) {

  let payload = JSON.stringify(msg);
  for (let socket in socketPool) {
    socketPool[socket].write(payload);
  }
}

function pickUpHandler(EVENT, payload) {

  console.log({ EVENT, payload, time });
  payload.EVENT = EVENT;
  broadcast(payload);
}

function inTransitHanndler(EVENT, payload) {

  console.log({ EVENT, payload, time });
  payload.EVENT = EVENT;
  broadcast(payload);
}

function deliverdHandler(EVENT, payload) {

  console.log({ EVENT, payload, time });
  payload.EVENT = EVENT;
  broadcast(payload);
}