'use strict';

const net = require('net');

const client = new net.Socket();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

client.connect(PORT, HOST, () => console.log(`driver is connected`));


client.on('data', dispatchEvent);

function dispatchEvent(buffer) {
  var time = new Date();
  let raw = buffer.toString().trim();
  let message = JSON.parse(raw);
  let { event, payload } = message;
  if (event === 'pickup') {
    setTimeout(() => {
      console.log(`picked up ${payload.orderID}`);
      let newevent = JSON.stringify({ event: 'in-transit', payload: payload });
      client.write(newevent);
    }, 1000);
    setTimeout(() => {
      console.log(`delivered ${payload.orderID}`);
      let newevent = JSON.stringify({ event: 'delivered', payload: payload, time });
      client.write(newevent);
    }, 3000);
  }
}


client.on('close', function() {
  console.log('Connection got closed');
});