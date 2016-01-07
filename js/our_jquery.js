$(document).ready(function() {
  var thermy = new Thermostat();

  $.getJSON({
    url: "http://api.openweathermap.org/data/2.5/forecast/weather?q=London,uk&APPID=08edfb8e9306032dca7e53b61d924bff",
    dataType: "jsonp",
    jsonpCallback: "jsonp",
    success: function(data) {
      console.log(data);
      console.log(data.weather);
      // console.log(weatherStation.weather.id);
      // $( "#weather" ).text(weatherStation.weather);
    },
    error: function(json) {
      console.log("there was a problem"+json);
    }
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
