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
    let yourCity = document.querySelector("#city");
    let cityInput = document.querySelector("#citySearchInput");
    yourCity.innerHTML = "🏙 " + cityInput.value;
    let apiKey = "858d477189f385816ffe23d2ae072edf";
    let units = "imperial";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=${units}`;
    axios.get(`${apiURL}&appid=${apiKey}`).then(displayTemperature);
}

function displayTemperature(response) {
    let yourTemperature = Math.round(response.data.main.temp);
    let yourCurrentWeather = document.querySelector("#currentWeather");
    let yourHumidity = document.querySelector("#humidity");
    let yourWindspeed = document.querySelector("#windSpeed");
    let yourWeather = document.querySelector("#temperature");
    yourCurrentWeather.innerHTML = "🌤 " + response.data.weather[0].description;
    yourHumidity.innerHTML = "🔥 " + response.data.main.humidity;
    yourWindspeed.innerHTML = "🍃 " + Math.round(response.data.wind.speed);
    yourWeather.innerHTML = `🌡 ${yourTemperature}° F`;
}

let yourCityForm = document.querySelector("#citySearch");
yourCityForm.addEventListener("submit", searchCity);