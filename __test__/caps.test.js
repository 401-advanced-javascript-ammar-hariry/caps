'use strict';
const events = require('../events');
require('../vendor');
require('../driver');

jest.spyOn(global.console, 'log');

let payload = {
  store: '1-206-flowers',
  orderID: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
  customer: 'Jamal Braun',
  address: 'Schmittfort, LA',
};

describe('Events Handlers Test', () => {
  it('pickUpHandler()', () => {
    events.emit('pickup', payload);
    expect(console.log).toHaveBeenCalled();
  });
  it('inTransitHandler()', () => {
    events.emit('in-transit', payload);
    expect(console.log).toHaveBeenCalled();
  });
  it('pickUpHandler()', () => {
    events.emit('delevered', payload);
    expect(console.log).toHaveBeenCalled();
  });

});