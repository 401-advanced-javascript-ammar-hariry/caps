'use strict';
const faker = require('faker');
// const events = require('../events');
const net = require('net');

const client = new net.Socket();



const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

client.connect(PORT, HOST, () => console.log(`vendor is connected`));


const oreders = [];

client.on('data', function(data) {
    let eventObj = JSON.parse(data);
    if (eventObj.EVENT === "delivered") {
        console.clear();
        oreders.push(eventObj.payload);

        oreders.forEach(msg => console.log(`thank you for delivering ${eventObj.orderID}`));
    }
    console.log()

});

setInterval(function sendMessage(text) {
    var obl = {
        store: 'Ammar store',
        orderID: faker.random.uuid(),
        customer: faker.name.findName(),
        address: `${faker.address.city()} , ${faker.address.stateAbbr()}`,
    }
    let event = JSON.stringify(obl);
    client.write(event);
}, 5000);

client.on('close', function() {
    console.log('Connection got closed');
});