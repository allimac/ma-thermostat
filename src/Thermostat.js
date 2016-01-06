function Thermostat() {
  this.temp = 20;
  this.MIN_TEMP = 10;
  this.powerSave = true;
  this.colorOption = ['blue', 'green', 'red'];
}

Thermostat.prototype.getTemp = function () {
  return this.temp;
};

Thermostat.prototype.increase = function () {
  if (!this.powerSave && this.temp >= 32) throw new Error("Cannot exceed 32 degrees");
  if (this.powerSave && this.temp >= 25 ) throw new Error("Can't go higher: 25 degrees is the maximum temperature on power save!");
  this.temp += 1;
  return this.temp;
};

Thermostat.prototype.decrease = function () {
  if (this.temp <= this.MIN_TEMP ) throw new Error("Can't go below: 10 degrees is the minimum temperature!");
  this.temp -= 1;
  return this.temp;
};

Thermostat.prototype.switchMode = function() {
  if(this.powerSave) {
    this.powerSave = false;
  } else {
    this.powerSave = true;
  }
};

Thermostat.prototype.reset = function() {
  this.temp = 20;
};

Thermostat.prototype.colorCheck = function() {
  if (this.temp <= 18) {
    return this.colorOption[0];
  } else if (this.temp > 25) {
    return this.colorOption[2];
  } else {
    return this.colorOption[1];
  }
};
