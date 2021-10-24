
// DATA
const data = {
  city: 'London',
  homeCity: 'London',
  date: '',
  forecast1: '',
  forecast2: ''
};

if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

// PAGE VARIABLES
const currentDate = document.getElementById('currentDate');
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
const inputToJSON = JSON.stringify(data);
const forecastDay1 = document.getElementById('date1');
const forecastDay2 = document.getElementById('date2');
const forecastCondition1 = document.getElementById('condition1');
const forecastCondition2 = document.getElementById('condition2');
let dayNum;
const weekdayTitle = document.getElementById('weekday');

// -
// -
// -
// -
// -

window.addEventListener('load', function () {
  data.city = data.homeCity;
  // set page to home city
  const home = new XMLHttpRequest();
  home.open('GET', 'http://api.weatherapi.com/v1/forecast.json?key=a2afe3df405444feb8d30816211310&q=' + data.homeCity + '&days=3&aqi=no&alerts=no');
  home.send();
  home.onload = function () {
    cityWeather = JSON.parse(setForecast.responseText);
    cityName.textContent = titleCase(data.city);

    cityWeather = JSON.parse(setForecast.responseText);
    currentCondition.textContent = cityWeather.current.condition.text;
    currentWind.textContent = cityWeather.current.wind_mph;
    currentHumidity.textContent = 'Humidity:' + ' ' + cityWeather.current.humidity;
    currentTemp.textContent = cityWeather.current.temp_f;
    fahrenheit.textContent = ' \u00B0' + 'F';
    rainAmount.textContent = 'Rainfall:' + ' ' + cityWeather.current.precip_in + ' ';
    inches.textContent = 'in';
    setTimeAndDay(cityWeather.forecast.forecastday);
    determineWeatherImage(cityWeather.current.condition.text);

    forecastCondition1.textContent = cityWeather.forecast.forecastday[1].day.condition.text;
    forecastCondition2.textContent = cityWeather.forecast.forecastday[2].day.condition.text;

    currentDate.textContent = cityWeather.location.localtime;
    const dayOfWeek = new Date(cityWeather.location.localtime);
    dayNum = dayOfWeek.getDay();
    transformToDay(dayNum);
    weekdayTitle.textContent = dayNum;

  };
});

// -
// -
// -
// -
// -

myForm.addEventListener('submit', function () {
  event.preventDefault();
  if (myForm.elements.cityInput.value === ' ') {
    error.textContent = 'Please enter a city name';
    error.style.color = 'RGB(255, 61, 77)';
    data.city = homeCity;
    localStorage.setItem('javascript-local-storage', inputToJSON);
  } else {
    data.city = myForm.elements.cityInput.value;
    myForm.reset();

    const setForecast = new XMLHttpRequest();
    setForecast.open('GET', 'http://api.weatherapi.com/v1/forecast.json?key=a2afe3df405444feb8d30816211310&q=' + data.city + '&days=3&aqi=no&alerts=no');
    setForecast.send();

    setForecast.onload = function () {
      if (setForecast.status !== 200) { // analyze HTTP status of the response
        error.textContent = 'City not found';
        error.style.color = 'RGB(255, 61, 77)';
        data.city = homeCity;
        cityName.textContent = titleCase(data.city);
        localStorage.setItem('javascript-local-storage', inputToJSON);
      } else { // show the result
        error.textContent = '';

        cityName.textContent = titleCase(data.city);

        cityWeather = JSON.parse(setForecast.responseText);
        currentCondition.textContent = cityWeather.current.condition.text;
        currentWind.textContent = cityWeather.current.wind_mph;
        currentHumidity.textContent = 'Humidity:' + ' ' + cityWeather.current.humidity;
        currentTemp.textContent = cityWeather.current.temp_f;
        fahrenheit.textContent = ' \u00B0' + 'F';
        rainAmount.textContent = 'Rainfall:' + ' ' + cityWeather.current.precip_in + ' ';
        inches.textContent = 'in';
        setTimeAndDay(cityWeather.forecast.forecastday);
        determineWeatherImage(cityWeather.current.condition.text);

        forecastCondition1.textContent = cityWeather.forecast.forecastday[1].day.condition.text;
        forecastCondition2.textContent = cityWeather.forecast.forecastday[2].day.condition.text;
        currentDate.textContent = cityWeather.location.localtime;
        const dayOfWeek = new Date(cityWeather.location.localtime);
        dayNum = dayOfWeek.getDay();
        transformToDay(dayNum);
        weekdayTitle.textContent = dayNum;
      }
    };
  }

  // -
  // -
  // -
  // -
  // -

  const setConditions = new XMLHttpRequest();
  setConditions.open('GET', 'http://api.weatherapi.com/v1/current.json?key=a2afe3df405444feb8d30816211310&q=' + data.city + '&aqi=no');
  setConditions.send();

  setConditions.onload = function () {
    if (setConditions.status !== 200) {
      error.textContent = 'City not found';
      error.style.color = 'RGB(255, 61, 77)';
      data.city = homeCity;
      cityName.textContent = titleCase(data.city);
      var inputToJSON = JSON.stringify(data);
      localStorage.setItem('javascript-local-storage', inputToJSON);
    } else {
      error.textContent = '';

      cityName.textContent = titleCase(data.city);
      cityWeather = JSON.parse(setConditions.responseText);
      currentCondition.textContent = cityWeather.current.condition.text;
      currentWind.textContent = cityWeather.current.wind_mph;
      currentHumidity.textContent = 'Humidity:' + ' ' + cityWeather.current.humidity;
      currentTemp.textContent = cityWeather.current.temp_f;
      fahrenheit.textContent = ' \u00B0' + 'F';
      rainAmount.textContent = 'Rainfall:' + ' ' + cityWeather.current.precip_in + ' ';
      inches.textContent = 'in';

      currentDate.textContent = cityWeather.location.localtime;
      const dayOfWeek = new Date(cityWeather.location.localtime);
      dayNum = dayOfWeek.getDay();
      transformToDay(dayNum);
      weekdayTitle.textContent = dayNum;
    }
  };
});

// -
// -
// -
// -
// -
const setForecast = new XMLHttpRequest();
setForecast.open('GET', 'http://api.weatherapi.com/v1/forecast.json?key=a2afe3df405444feb8d30816211310&q=' + data.city + '&days=3&aqi=no&alerts=no');
setForecast.send();

setForecast.onload = function () {
  if (setForecast.status !== 200) { // analyze HTTP status of the response
    error.textContent = 'City not found';
    error.style.color = 'RGB(255, 61, 77)';
    data.city = homeCity;
    cityName.textContent = titleCase(data.city);
    localStorage.setItem('javascript-local-storage', inputToJSON);
  } else { // show the result
    error.textContent = '';

    cityName.textContent = titleCase(data.city);

    cityWeather = JSON.parse(setForecast.responseText);
    currentCondition.textContent = cityWeather.current.condition.text;
    currentWind.textContent = cityWeather.current.wind_mph;
    currentHumidity.textContent = 'Humidity:' + ' ' + cityWeather.current.humidity;
    currentTemp.textContent = cityWeather.current.temp_f;
    fahrenheit.textContent = ' \u00B0' + 'F';
    rainAmount.textContent = 'Rainfall:' + ' ' + cityWeather.current.precip_in + ' ';
    inches.textContent = 'in';
    setTimeAndDay(cityWeather.forecast.forecastday);
    determineWeatherImage(cityWeather.current.condition.text);

    currentDate.textContent = cityWeather.location.localtime;
    const dayOfWeek = new Date(cityWeather.location.localtime);
    dayNum = dayOfWeek.getDay();
    transformToDay(dayNum);
    weekdayTitle.textContent = dayNum;
  }
};
// -
// -
// -
// -
// -

// UTILITY FUNCTIONS
function transformToDay() {
  if (dayNum === 0) {
    dayNum = '(Sunday)';
  } else if (dayNum === 1) {
    dayNum = '(Monday)';
  } else if (dayNum === 2) {
    dayNum = '(Tuesday)';
  } else if (dayNum === 3) {
    dayNum = '(Wednesday)';
  } else if (dayNum === 4) {
    dayNum = '(Thursday)';
  } else if (dayNum === 5) {
    dayNum = '(Friday)';
  } else if (dayNum === 6) {
    dayNum = '(Saturday)';
  }
  return dayNum;
}

function titleCase(str) {
  if ((str === null) || (str === '')) { return false; } else { str = str.toString(); }

  return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

function isolateDate(string) {
  const newString = string.split('-');
  const monthAndDay = newString[1] + '/' + newString[2];
  return monthAndDay;
}

function setTimeAndDay(localWeatherArray) {
  const day1 = isolateDate(localWeatherArray[1].date);
  const day2 = isolateDate(localWeatherArray[2].date);
  data.forecast1 = day1;
  currentDate.textContent = cityWeather.location.localtime;
  const dayOfWeek = new Date(cityWeather.location.localtime);
  dayNum = dayOfWeek.getDay();
  transformToDay(dayNum);
  weekdayTitle.textContent = dayNum;
  data.forecast2 = day2;
  forecastDay1.textContent = data.forecast1;
  forecastDay2.textContent = data.forecast2;
  localStorage.setItem('javascript-local-storage', inputToJSON);
}
// -
// -
// -
// -
// -

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

// -
// -
// -
// -
// -

/*
previousUserInput = JSON.parse(previousUserInputJSON);
data.city = previousUserInput.city;
console.log('outside of everything', data.city);
const xhrForecast = new XMLHttpRequest();
xhrForecast.open('GET', 'http://api.weatherapi.com/v1/forecast.json?key=a2afe3df405444feb8d30816211310&q=' + data.city + '&days=7&aqi=no&alerts=no');
xhrForecast.send();

xhrForecast.onload = function () {
  if (xhrForecast.status !== 200) { // analyze HTTP status of the response
    console.log(`Error ${xhrForecast.status}: ${xhrForecast.statusText}`); // e.g. 404: Not Found
  } else { // show the result
    console.log('xhrForecast, data.city', data.city);
    const weekForecast = JSON.parse(xhrForecast.responseText);

    timeAndDay = weekForecast.location.localtime;
    var split = timeAndDay.split(' ');
    var date = split[0];
    var dateSplit = date.split('-');
    time.textContent = getDayOfWeek(split[0]) + ': ' + dateSplit[1] + '/' + dateSplit[2];

    const day1 = isolateDate(weekForecast.forecast.forecastday[1].date);
    const day2 = isolateDate(weekForecast.forecast.forecastday[2].date);
    data.forecast1 = day1;
    console.log('forecast day1:', data.forecast1);
    data.forecast2 = day2;
    console.log('forecast day2:', data.forecast2);
    localStorage.setItem('javascript-local-storage', inputToJSON);
    forecastDay1.textContent = data.forecast1;
    forecastDay2.textContent = data.forecast2;
  }
};
*/
