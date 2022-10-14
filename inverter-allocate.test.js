const inverter = require('./inverter-allocate');

test('min panels', () => {
    expect(inverter.getMinPanelsOnString(320, 33.8)).toBe(7);
});
