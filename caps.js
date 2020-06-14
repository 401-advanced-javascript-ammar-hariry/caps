'use strict';

const events = require('./events');
const faker = require('faker');
require('dotenv').config();

require('./vendor');
require('./driver');

var storeName = process.env.STORE;

function emitting() {
  events.emit('pickup', {
    store: storeName,
    orderID: faker.random.uuid(),
    customer: faker.name.findName(),
    address: `${faker.address.city()} , ${faker.address.stateAbbr()}`,
  });
}
setInterval(emitting, 5000);