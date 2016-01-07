$(document).ready(function() {
  var thermy = new Thermostat();
  var cityData;
  var userCity;

function getLocation(){
  var deferred = $.Deferred();

  $.getJSON('https://freegeoip.net/json/').done(function(location) {
    userCity = location.city;
  }, function(){
    deferred.resolve();
  });

  return deferred.promise();
}

function getWeather(){
  weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q="+ userCity +",uk&units=metric&APPID=08edfb8e9306032dca7e53b61d924bff";
  $.get(weatherUrl, function(data) {
    $( "#outsideTemp" ).text(Math.floor(data.main.temp));
    $( "#weatherCondition" ).text(data.weather[0].main);
    $("#city").text(userCity);
  });
}

getLocation().done(function(){
  getWeather();
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
