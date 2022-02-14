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

function forecastDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

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
  showForecast(response.data.coord);
}

function showForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "858d477189f385816ffe23d2ae072edf";
  let units = "imperial";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${units}`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastSection = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML = forecastHTML +
      `
      <div class="col-2">
        <div class="forecast-date">
          ${forecastDays(forecastDay.dt)}
        </div>
        <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
          alt=""
          width="30"
        />
        <div class="forecast-temperatures">
          <span class="forecast-temp-max">
            ${Math.round(forecastDay.temp.max)}°
          </span>
          <span class="forecast-temp-min">
            ${Math.round(forecastDay.temp.min)}°
          </span>
        </div>
      </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastSection.innerHTML = forecastHTML;
}

let yourCityForm = document.querySelector("#citySearch");
yourCityForm.addEventListener("submit", searchCity);

searchForecast("Las Vegas");