let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let now = new Date();
let date = now.getDate();
let currentDay = days[now.getDay()];
let currentMonth = months[now.getMonth()];
let currentYear = now.getFullYear();
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let dateFormat = `${currentDay}, ${currentMonth} ${date}, ${currentYear}`;
let timeFormat = `${currentHour}:${currentMinutes}`;

let todayDate = document.querySelector("#date");
todayDate.innerHTML = `📅 ${dateFormat}`;

let currentTime = document.querySelector("#time");
currentTime.innerHTML = `⏰ ${timeFormat}`;

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#citySearchInput");
  searchForecast(cityInput.value);
}

function searchForecast(city) {
  let apiKey = "858d477189f385816ffe23d2ae072edf";
  let units = "imperial";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(displayTemperature);
}

function displayTemperature(response) {
  let yourWeatherIcon = document.querySelector("#weatherIcon")
  let yourCurrentWeather = document.querySelector("#currentWeather");
  let yourHumidity = document.querySelector("#humidity");
  let yourWindspeed = document.querySelector("#windSpeed");
  let yourWeather = document.querySelector("#temperature");
  let yourCity = document.querySelector("#city");
  fahrenheitTemp = response.data.main.temp;
  yourWeatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  yourWeatherIcon.setAttribute(
    "alt", response.data.weather[0].description
  );
  yourCurrentWeather.innerHTML = "🌤 " + response.data.weather[0].description;
  yourHumidity.innerHTML = "🔥 Humidity: " + response.data.main.humidity + "%";
  yourWindspeed.innerHTML = "🍃 Windspeed: " + Math.round(response.data.wind.speed) + " km/h";
  yourWeather.innerHTML = `🌡 ${Math.round(fahrenheitTemp)}° F`;
  yourCity.innerHTML = "🏙 " + response.data.name;
}

function fahrenheitTemperature(event) {
  event.preventDefault();
  celsiusConversion.classList.remove("active");
  fahrenheitConversion.classList.add("active");
  let yourTemperature = document.querySelector("#temperature");
  yourTemperature.innerHTML = "🌡 " + Math.round(fahrenheitTemp) + "° F";
}

function celsiusTemperature(event) {
  event.preventDefault();
  celsiusConversion.classList.add("active");
  fahrenheitConversion.classList.remove("active");
  let yourTemperature = document.querySelector("#temperature");
  let celsiusTemp = (fahrenheitTemp - 32) * 5 / 9;
  yourTemperature.innerHTML = "🌡 " + Math.round(celsiusTemp) + "° C";
}

let fahrenheitTemp = null;

let yourCityForm = document.querySelector("#citySearch");
yourCityForm.addEventListener("submit", searchCity);

let celsiusConversion = document.querySelector("#convertCelsius");
celsiusConversion.addEventListener("click", celsiusTemperature);

let fahrenheitConversion = document.querySelector("#convertFahrenheit");
fahrenheitConversion.addEventListener("click", fahrenheitTemperature);

searchForecast("Las Vegas");