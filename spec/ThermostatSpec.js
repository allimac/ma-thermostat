describe("Thermostat", function() {

  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  describe("Initialization", function() {
    it("initializes at 20 degrees", function(){
      expect(thermostat.temp).toEqual(20);
    });

    it("initializes with power saving mode on", function(){
      expect(thermostat.powerSave).toBe(true);
    });

    it("initializes with currentColor set to green", function(){
      expect(thermostat.colorCheck()).toEqual('green');
    });
  });

  describe("#Increase", function() {
    it("increases temperature of 1 degree with increase button", function(){
      expect(thermostat.increase()).toEqual(21);
    });

    it("prevents to increase temperature if it's higher than 25 (with power saving mode)", function(){
      for (var i = 1; i <= 5; i++) {
        thermostat.increase();
      }
      expect(function(){thermostat.increase();}).toThrow(new Error("Can't go higher: 25 degrees is the maximum temperature on power save!"));
    });

    it("prevents temperature from exceeding 32 degrees without powersave", function() {
      thermostat.switchMode();
      for(var i = 0; i < 12; i++) {
        thermostat.increase();
      }
      expect(function() {
        thermostat.increase();
      }).toThrow(new Error("Cannot exceed 32 degrees"));
    });
  });

  describe("#decrease", function() {
    it("decreases temperature of 1 degree with decrease button", function(){
      expect(thermostat.decrease()).toEqual(19);
    });

    it("prevents to decrease temperature if it's lower than 10", function(){
      for (var i = 1; i <= 10; i++) {
        thermostat.decrease();
      }
      expect(function(){thermostat.decrease();}).toThrow(new Error("Can't go below: 10 degrees is the minimum temperature!"));
    });
  });

  describe("#reset", function() {
    it("allows user to reset temp to 20 degrees by hitting the reset button", function() {
      thermostat.increase();
      thermostat.reset();
      expect(thermostat.temp).toEqual(20);
    });
  });

  describe('#colorCheck', function(){
    it("changes currentColor to blue when temp equals 18 or less", function(){
      for(var i = 0; i < 3; i++) {
        thermostat.decrease();
      }
      expect(thermostat.colorCheck()).toEqual('blue');
    });

    it("changes currentColor to red when temp is higher than 25", function() {
      thermostat.switchMode();
      for(var x = 0; x < 10; x++) {
        thermostat.increase();
      }
      expect(thermostat.colorCheck()).toEqual('red');
    });

    it("currentColor is green when temp is between 18 and 25", function() {
      for(var x = 0; x < 2; x++) {
        thermostat.increase();
      }
      expect(thermostat.colorCheck()).toEqual('green');
    });
  });
});
