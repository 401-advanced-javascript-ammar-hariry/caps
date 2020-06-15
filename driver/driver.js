'use strict';

const net = require('net');

const client = new net.Socket();



const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

client.connect(PORT, HOST, () => console.log(`driver is connected`));

const oreders = [];

client.on('data', function(data) {
  let eventObj = JSON.parse(data);
  if (eventObj.EVENT === 'in-transit') {
    console.clear();
    oreders.push(eventObj.payload);

    oreders.forEach(oredrs => console.log(`thank you for delivering ${eventObj.orderID}`));
  }
  console.log();
});

client.on('close', function() {
  console.log('Connection got closed');
});