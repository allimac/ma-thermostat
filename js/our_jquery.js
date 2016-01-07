$(document).ready(function() {
  var thermy = new Thermostat();

  $.get("http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=08edfb8e9306032dca7e53b61d924bff", function(data) {
    console.log(data.weather)
    $( "#outsideTemp" ).text(Math.floor(data.main.temp));
    $( "#weatherCondition" ).text(data.weather[0].main);
  });

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
    updatetemperature();
  });

  function updatetemperature() {
    $( "#temp" ).text(thermy.getTemp());
    $( "#temp" ).attr('class', thermy.energyUsage());
  }
});
