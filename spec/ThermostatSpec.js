describe("Thermostat", function() {

  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  describe("Initialization", function() {
    it("initializes at 20 degrees", function(){
      expect(thermostat.getTemp()).toEqual(20);
    });

    it("initializes with power saving mode on", function(){
      expect(thermostat.powerSaveMode).toBe(true);
    });
  });

  describe("#Increase", function() {
    it("increases temperature of 1 degree with increase button", function(){
      expect(thermostat.increaseTemp()).toEqual(21);
    });

    it("prevents to increase temperature if it's higher than 25 (with power saving mode)", function(){
      for (var i = 0; i < 5; i++) {
        thermostat.increaseTemp();
      }
      expect(function(){thermostat.increaseTemp();}).toThrow(new Error("Cannot exceed 25 degrees"));
    });

    it("prevents temperature from exceeding 32 degrees without powersave", function() {
      thermostat.switchPowerSaveMode();
      for(var i = 0; i < 12; i++) {
        thermostat.increaseTemp();
      }
      expect(function() { thermostat.increaseTemp(); }).toThrow(new Error("Cannot exceed 32 degrees"));
    });
  });

  describe("#decrease", function() {
    it("decreases temperature of 1 degree with decrease button", function(){
      expect(thermostat.decreaseTemp()).toEqual(19);
    });

    it("prevents to decrease temperature if it's lower than 10", function(){
      for (var i = 0; i < 10; i++) {
        thermostat.decreaseTemp();
      }
      expect(function(){thermostat.decreaseTemp();}).toThrow(new Error("Can't go below 10 degrees!"));
    });
  });

  describe("#reset", function() {
    it("allows user to reset temp to 20 degrees by hitting the reset button", function() {
      thermostat.increaseTemp();
      thermostat.resetTemp();
      expect(thermostat.getTemp()).toEqual(20);
    });
  });

  describe('#energyUsage', function(){
    it("energyUsage is 'low' when temp equals 18 or less", function(){
      for(var i = 0; i < 3; i++) {
        thermostat.decreaseTemp();
      }
      expect(thermostat.energyUsage()).toEqual('low-usage');
    });

    it("energyUsage is 'high' when temp is higher than 25", function() {
      thermostat.switchPowerSaveMode();
      for(var x = 0; x < 10; x++) {
        thermostat.increaseTemp();
      }
      expect(thermostat.energyUsage()).toEqual('high-usage');
    });

    it("energyUsage is 'medium' when temp is between 18 and 25", function() {
      for(var x = 0; x < 2; x++) {
        thermostat.increaseTemp();
      }
      expect(thermostat.energyUsage()).toEqual('medium-usage');
    });
  });
});
