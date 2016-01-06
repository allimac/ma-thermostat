function Thermostat() {
  this.temp = 20;
  this.powerSave = true;
}

Thermostat.prototype.increase = function () {
  if (this.powerSave && this.temp >= 25 ) throw new Error("Can't go higher: 25 degrees is the maximum temperature on power save!");
  return this.temp += 1;
};

Thermostat.prototype.decrease = function () {
  var MIN_TEMP = 10;
  if (this.temp <= MIN_TEMP ) throw new Error("Can't go below: 10 degrees is the minimum temperature!");
  return this.temp -= 1;
};
