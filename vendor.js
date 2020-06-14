'use strict';

const events = require('./events');



events.on('pickup', payload => pickUpHandler('pickup', payload));


function pickUpHandler(event, payload) {
  let time = new Date();
  console.log({ event, time, payload });
  setTimeout(() => {
    console.log(`DRIVER: Picked Up ${payload.orderID}`);
    events.emit('in-transit', payload);
  }, 1000);
  setTimeout(() => {
    console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
    events.emit('delevered', payload);
  }, 3000);
}