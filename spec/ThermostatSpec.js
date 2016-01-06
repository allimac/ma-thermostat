describe("Thermostat", function() {

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it("initializes at 20 degrees", function(){
    expect(thermostat.temp).toEqual(20);
  });
});
