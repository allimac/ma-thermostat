describe("User Stories", function() {

    var thermostat;

    beforeEach(function() {
      thermostat = new Thermostat();
    });

    describe("Default status of thermostat", function() {
      it("initializes at 20 degrees", function(){
        expect(thermostat.temp).toEqual(20);
      });

      it("initializes with power saving mode on", function(){
        expect(thermostat.powerSave).toBe(true);
      });
    });

    describe("Increasing temperature", function() {
      it("increases temperature of 1 degree with increase button", function(){
        expect(thermostat.increase()).toEqual(21);
      });

      it("prevents to increase temperature if it's higher than 25 (with power saving mode)", function(){
        for (var i = 1; i <= 5; i++) {
          thermostat.increase();
        }
        expect(function(){thermostat.increase();}).toThrow(new Error("Can't go higher: 25 degrees is the maximum temperature on power save!"));
      });
    });

    describe("Decreasing temperature", function() {
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

  });
