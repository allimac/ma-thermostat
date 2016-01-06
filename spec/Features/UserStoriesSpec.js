describe("User Stories", function() {

  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it("initializes with a temperature of 20", function() {
    expect(thermostat.temp).toEqual(20);
  });
});
