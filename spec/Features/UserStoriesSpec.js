describe("User Stories", function() {

    var thermostat;

    beforeEach(function() {
      thermostat = new Thermostat();
    });

    describe("Default status of thermostat", function() {

      // Thermostat starts at 20 degrees
      it("initializes at 20 degrees", function(){
        expect(thermostat.temp).toEqual(20);
      });

      // Power saving mode is on by default
      it("initializes with power saving mode on", function(){
        expect(thermostat.powerSave).toBe(true);
      });
    });

    describe("Increasing temperature", function() {

      // You can increase the temperature with the up button
      it("increases temperature of 1 degree with increase button", function(){
        expect(thermostat.increase()).toEqual(21);
      });

      // If power saving mode is on, the maximum temperature is 25 degrees
      it("prevents to increase temperature if it's higher than 25 (with power saving mode)", function(){
        for (var i = 1; i <= 5; i++) {
          thermostat.increase();
        }
        expect(function(){thermostat.increase();}).toThrow(new Error("Can't go higher: 25 degrees is the maximum temperature on power save!"));
      });

      // If power saving mode is off, the maximum temperature is 32 degrees
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

    describe("Decreasing temperature", function() {

      // You can decrease the temperature with the down button
      it("decreases temperature of 1 degree with decrease button", function(){
        expect(thermostat.decrease()).toEqual(19);
      });

      // The minimum temperature is 10 degrees
      it("prevents to decrease temperature if it's lower than 10", function(){
        for (var i = 1; i <= 10; i++) {
          thermostat.decrease();
        }
        expect(function(){thermostat.decrease();}).toThrow(new Error("Can't go below: 10 degrees is the minimum temperature!"));
      });
    });

    // You can reset the temperature to 20 by hitting the reset button
    it("allows user to reset temp to 20 degrees by hitting the reset button", function() {
      thermostat.increase();
      thermostat.reset();
      expect(thermostat.temp).toEqual(20);
    });


    // The thermostat should colour the display based on energy usage - < 18 is green, < 25 is yellow, otherwise red
    it("changes colors depending on current temperature", function() {
      thermostat.switchMode();
      expect(thermostat.colorCheck()).toEqual('green');
      for(var i = 0; i < 3; i++) {
        thermostat.decrease();
      }
      expect(thermostat.colorCheck()).toEqual('blue');
      for(var x = 0; x < 10; x++) {
        thermostat.increase();
      }
      expect(thermostat.colorCheck()).toEqual('red');
    });
  });





































  // randomcharacter
