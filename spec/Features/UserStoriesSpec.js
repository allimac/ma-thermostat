describe("User Stories", function() {

    var thermostat;

    beforeEach(function() {
      thermostat = new Thermostat();
    });

    describe("Default status of thermostat", function() {

      // Thermostat starts at 20 degrees
      it("initializes at 20 degrees", function(){
        expect(thermostat.getTemp()).toEqual(20);
      });

      // Power saving mode is on by default
      it("initializes with power saving mode on", function(){
        expect(thermostat.powerSaveMode).toBe(true);
      });
    });

    describe("Increasing temperature", function() {

      // You can increase the temperature with the up button
      it("increases temperature of 1 degree with increase button", function(){
        expect(thermostat.increaseTemp()).toEqual(21);
      });

      // If power saving mode is on, the maximum temperature is 25 degrees
      it("prevents to increase temperature if it's higher than 25 (with power saving mode)", function(){
        for (var i = 1; i <= 5; i++) {
          thermostat.increaseTemp();
        }
        expect(function(){thermostat.increaseTemp();}).toThrow(new Error("Cannot exceed 25 degrees"));
      });

      // If power saving mode is off, the maximum temperature is 32 degrees
      it("prevents temperature from exceeding 32 degrees without powersave", function() {
        thermostat.switchPowerSaveMode();
        for(var i = 0; i < 12; i++) {
          thermostat.increaseTemp();
        }
        expect(function() { thermostat.increaseTemp(); }).toThrow(new Error("Cannot exceed 32 degrees"));
      });
    });

    describe("Decreasing temperature", function() {

      // You can decrease the temperature with the down button
      it("decreases temperature of 1 degree with decrease button", function(){
        expect(thermostat.decreaseTemp()).toEqual(19);
      });

      // The minimum temperature is 10 degrees
      it("prevents to decrease temperature if it's lower than 10", function(){
        for (var i = 1; i <= 10; i++) {
          thermostat.decreaseTemp();
        }
        expect(function(){thermostat.decreaseTemp();}).toThrow(new Error("Can't go below 10 degrees!"));
      });
    });

    // You can reset the temperature to 20 by hitting the reset button
    it("allows user to reset temp to 20 degrees by hitting the reset button", function() {
      thermostat.increaseTemp();
      thermostat.resetTemp();
      expect(thermostat.getTemp()).toEqual(20);
    });


    // The thermostat should colour the display based on energy usage - < 18 is green, < 25 is yellow, otherwise red
    it("changes colors depending on current temperature", function() {
      thermostat.switchPowerSaveMode();
      expect(thermostat.energyUsage()).toEqual('medium-usage');
      for(var i = 0; i < 3; i++) {
        thermostat.decreaseTemp();
      }
      expect(thermostat.energyUsage()).toEqual('low-usage');
      for(var x = 0; x < 10; x++) {
        thermostat.increaseTemp();
      }
      expect(thermostat.energyUsage()).toEqual('high-usage');
    });
  });





































  // randomcharacter
