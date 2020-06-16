'use strict';
const faker = require('faker');
// const events = require('../events');
const net = require('net');

const client = new net.Socket();



const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

client.connect(PORT, HOST, () => console.log(`vendor is connected`));


const oreders = [];

client.on('data', dataHandler);

function dataHandler(buffer) {
    let raw = buffer.toString().trim();
    let message = JSON.parse(raw);
    let { event, payload } = message;
    if (event === 'pickup') {
        console.log(` Thank you for deliverd ${payload.orderID}`);
    }
}

setInterval(function sendMessage() {
    var obl = {
        store: 'Ammar store',
        orderID: faker.random.uuid(),
        customer: faker.name.findName(),
        address: `${faker.address.city()} , ${faker.address.stateAbbr()}`,
    }
    let message = { event: 'pickup', payload: obl };
    let event = JSON.stringify(message);
    client.write(event);
}, 5000);

client.on('close', function() {
    console.log('Connection got closed');
});