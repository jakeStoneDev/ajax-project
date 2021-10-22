
const data = {
  city: 'London',
  homeCity: 'London'
};

if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

// Constant variables
const time = document.getElementById('time');
const currentCondition = document.getElementById('currentCondition');
const currentWind = document.getElementById('currentWind');
const currentHumidity = document.getElementById('currentHumidity');
const currentTemp = document.getElementById('currentTemp');
const fahrenheit = document.getElementById('fheit');
const rainAmount = document.getElementById('currentRain');
const inches = document.getElementById('inches');
const image = document.getElementById('circle');
const cityName = document.getElementById('cityName');
const myForm = document.getElementById('myForm');
const homeCity = 'London';
let cityWeather;
const error = document.getElementById('error');

// Setting Current Weather
myForm.addEventListener('submit', function () {
  event.preventDefault();
  if (myForm.elements.cityInput.value === ' ') {
    error.textContent = 'Please enter a city name';
    error.style.color = 'RGB(255, 61, 77)';
    data.city = homeCity;
    var inputToJSON = JSON.stringify(data);
    localStorage.setItem('javascript-local-storage', inputToJSON);
  } else {
    data.city = myForm.elements.cityInput.value;
    inputToJSON = JSON.stringify(data);
    localStorage.setItem('javascript-local-storage', inputToJSON);
    myForm.reset();
  }

  cityName.textContent = data.city;
  const xhr2 = new XMLHttpRequest();
  xhr2.open('GET', 'http://api.weatherapi.com/v1/current.json?key=a2afe3df405444feb8d30816211310&q=' + data.city + '&aqi=no');
  xhr2.send();

  xhr2.onload = function () {
    if (xhr2.status !== 200) { // analyze HTTP status of the response
      error.textContent = 'City not found';
      error.style.color = 'RGB(255, 61, 77)';
      data.city = homeCity;
      cityName.textContent = data.city;
      var inputToJSON = JSON.stringify(data);
      localStorage.setItem('javascript-local-storage', inputToJSON);
    } else { // show the result

      city = data.city;
      cityName.textContent = capitalizeFirstLetter(city);

      cityWeather = JSON.parse(xhr2.responseText);
      currentCondition.textContent = cityWeather.current.condition.text;
      currentWind.textContent = cityWeather.current.wind_mph;
      currentHumidity.textContent = 'Humidity:' + ' ' + cityWeather.current.humidity;
      currentTemp.textContent = cityWeather.current.temp_f;
      fahrenheit.textContent = ' \u00B0' + 'F';
      rainAmount.textContent = 'Rainfall:' + ' ' + cityWeather.current.precip_in + ' ';
      inches.textContent = 'in';

      const timeAndDay = cityWeather.location.localtime;
      var split = timeAndDay.split(' ');
      var date = split[0];
      var dateSplit = date.split('-');
      time.textContent = getDayOfWeek(split[0]) + ': ' + dateSplit[1] + '/' + dateSplit[2];

      determineWeatherImage(cityWeather.current.condition.text);
    }
  };
});

let city = 'London';

const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://api.weatherapi.com/v1/current.json?key=a2afe3df405444feb8d30816211310&q=' + data.city + '&aqi=no');
xhr.send();

xhr.onload = function () {
  if (xhr.status !== 200) { // analyze HTTP status of the response
  } else { // show the result

    city = data.city;
    cityName.textContent = capitalizeFirstLetter(data.city);

    cityWeather = JSON.parse(xhr.responseText);
    currentCondition.textContent = cityWeather.current.condition.text;
    currentWind.textContent = cityWeather.current.wind_mph;
    currentHumidity.textContent = 'Humidity:' + ' ' + cityWeather.current.humidity;
    currentTemp.textContent = cityWeather.current.temp_f;
    fahrenheit.textContent = ' \u00B0' + 'F';
    rainAmount.textContent = 'Rainfall:' + ' ' + cityWeather.current.precip_in + ' ';
    inches.textContent = 'in';

    const timeAndDay = cityWeather.location.localtime;
    var split = timeAndDay.split(' ');
    var date = split[0];
    var dateSplit = date.split('-');
    time.textContent = getDayOfWeek(split[0]) + ': ' + dateSplit[1] + '/' + dateSplit[2];

    determineWeatherImage(cityWeather.current.condition.text);
  }
};

// Utility functions
function getDayOfWeek(date) {
  const dayOfWeek = new Date(date).getDay();
  return isNaN(dayOfWeek)
    ? null
    : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// Set weather image

function determineWeatherImage(condition) {
  var split = condition.split(' ');
  for (var i = 0; i < split.length; i++) {
    const weather = split[i].toLowerCase();
    if (weather === 'rain' || weather === 'drizzle') {
      image.style.backgroundImage = "url('images/rain.jpg')";
    } else if (weather === 'cloudy') {
      image.style.backgroundImage = "url('images/cloudy.jpg')";
    } else if (weather === 'smoke') {
      image.style.backgroundImage = "url('images/fire.jpg')";
    } else if (weather === 'fog') {
      image.style.backgroundImage = "url('images/fog.jpg')";
    } else if (weather === 'hail') {
      image.style.backgroundImage = "url('images/hail.jpg')";
    } else if (weather === 'hurricane') {
      image.style.backgroundImage = "url('images/hurricane.jpg')";
    } else if (weather === 'mist') {
      image.style.backgroundImage = "url('images/mist.jpg')";
    } else if (weather === 'night' || weather === 'clear') {
      image.style.backgroundImage = "url('images/night.jpg')";
    } else if (weather === 'night rain') {
      image.style.backgroundImage = "url('images/nightrain.jpg')";
    } else if (weather === 'snow') {
      image.style.backgroundImage = "url('images/snow.jpg')";
    } else if (weather === 'storm') {
      image.style.backgroundImage = "url('images/storm.jpg.jpg')";
    } else if (weather === 'sunny') {
      image.style.backgroundImage = "url('images/sunny.jpg')";
    } else if (weather === 'sunrise') {
      image.style.backgroundImage = "url('images/sunrise.jpg')";
    } else if (weather === 'sunset') {
      image.style.backgroundImage = "url('images/sunset.jpg')";
    } else if (weather === 'tornado') {
      image.style.backgroundImage = "url('images/tornado.jpg')";
    } else if (weather === 'windy') {
      image.style.backgroundImage = "url('images/windy.jpg')";
    } else if (weather === 'overcast') {
      image.style.backgroundImage = "url('images/overcast.jpg')";
    }
  }
}
