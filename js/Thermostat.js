function Thermostat() {
  this.DEFAULT_TEMP = 20;
  this.MIN_TEMP = 10;
  this.MAX_TEMP = 32;
  this.MAX_TEMP_PSM = 25;
  this.currentMaxTemp = this.MAX_TEMP_PSM;
  this.currentTemp = this.DEFAULT_TEMP;
  this.powerSaveMode = true;
}

Thermostat.prototype.getTemp = function () {
  return this.currentTemp;
};

Thermostat.prototype.increaseTemp = function () {
  if (this.currentTemp >= this.currentMaxTemp) {
    throw new Error("Cannot exceed "+this.currentMaxTemp+" degrees");
  }
  return this.currentTemp += 1;
};

Thermostat.prototype.decreaseTemp = function () {
  if (this.currentTemp <= this.MIN_TEMP ) {
    throw new Error("Can't go below "+this.MIN_TEMP+" degrees!");
  }
  return this.currentTemp -= 1;
};

Thermostat.prototype.switchPowerSaveMode = function() {
  this.powerSaveMode = !this.powerSaveMode;
  this._changeMaxTemp();
  if (this.currentTemp > this.currentMaxTemp) {
    this.resetTemp(this.currentMaxTemp);
  }
};

Thermostat.prototype.isPowerSaveModeOn = function() {
  return (this.powerSaveMode ? true : false);
};

Thermostat.prototype.resetTemp = function(temp) {
  this.currentTemp = temp || this.DEFAULT_TEMP;
};

Thermostat.prototype.energyUsage = function() {
  if (this.currentTemp <= 18) {
    return 'low-usage';
  } else if (this.currentTemp > 25) {
    return 'high-usage';
  } else {
    return 'medium-usage';
  }
};

Thermostat.prototype._changeMaxTemp = function () {
  this.currentMaxTemp = (this.powerSaveMode ? this.MAX_TEMP_PSM : this.MAX_TEMP);
};
