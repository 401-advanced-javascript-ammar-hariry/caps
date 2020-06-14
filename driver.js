'use strict';

const events = require('./events');

events.on('in-transit', inTransitHandler);
events.on('delevered', payload => logger('delevered', payload));

function inTransitHandler(payload) {
  logger('in-transit', payload);
  console.log(`DRIVER: delivered up ${payload.orderID}`);
}

function logger(event, payload) {

  let time = new Date();
  console.log({ event, time, payload });
}