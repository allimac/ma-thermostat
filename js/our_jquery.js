$(document).ready(function() {
  var thermy = new Thermostat();

  $("#increaseTemp").click(function() {
    thermy.increaseTemp();
    updatetemperature();
  });

  $("#decreaseTemp").click(function() {
    thermy.decreaseTemp();
    updatetemperature();
  });

  $("#resetTemp").click(function() {
    thermy.resetTemp();
    updatetemperature();
  });

  $("#switchPowerSave").click(function() {
    thermy.switchPowerSaveMode();
    $( this ).text((thermy.isPowerSaveModeOn() ? "Turn powersave off" : "Turn powersave on"));
  });

  function updatetemperature() {
    $( "#temp" ).text(thermy.getTemp());
  }
});
