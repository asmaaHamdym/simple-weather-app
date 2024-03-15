function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}
function updateWeather(response) {
  const status = response.data.status;
  if (status === `not_found`) {
    mainDisplay.style.display = "none";
    errorDisplay.innerHTML = `<h1>Can't find this city! 🤷‍♀️</h1>`;
    return;
  }
  const date = new Date(response.data.time * 1000);
  currentDateELement.innerHTML = formatDate(date);

  descriptionELement.textContent = response.data.condition.description;

  temperatureELement.textContent = Math.round(
    response.data.temperature.current
  );

  humidityELement.textContent = `${response.data.temperature.humidity}%`;

  iconELement.src = response.data.condition.icon_url;

  windELement.textContent = `${response.data.wind.speed} km/h`;

  cityElement.textContent = `${response.data.city}, ${response.data.country}`;

  errorDisplay.innerHTML = ``;
  mainDisplay.style.display = "block";
}
function getWeatherData(city) {
  const apiKey = "3c9b157d324o427adbae47ft0a08477e";
  const url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(updateWeather);
}
function getForecast(city) {
  const apiKey = "3c9b157d324o427adbae47ft0a08477e";
  const url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then((res) => {
    console.log(res.data.daily);
  });
}

function handleSearchSubmit(event) {
  event.preventDefault();
  const city = searchInputElement.value;
  getWeatherData(city);
  getForecast(city);
}
const displayForecast = () => {
  const days = ["sat", "sun", "mon", "tue"];
  days.forEach((day) => {
    const divDay = document.createElement("div");
    divDay.innerHTML = `<div class="weather-forecast-col">
              <div class="weather-forecast-date">${day}</div>
              <div class="weather-forecast-icon">🌤️</div>
              <div class="weather-forecast-temperatures">
                <div class="weather-forecast-temperature">
                  <strong>15º</strong>
                </div>
                <div class="weather-forecast-temperature">9º</div>
              </div>
            </div>`;
    forecastElement.appendChild(divDay);
  });
};

const mainDisplay = document.querySelector("main");
const currentDateELement = document.querySelector("#current-date");
const searchInputElement = document.querySelector("#search-input");
const cityElement = document.querySelector("#current-city");
const iconELement = document.querySelector(".current-temperature-icon");
const temperatureELement = document.querySelector(".current-temperature-value");
const descriptionELement = document.querySelector("#description");
const humidityELement = document.querySelector("#humidity");
const windELement = document.querySelector("#wind");
const errorDisplay = document.querySelector(".errorDisplay");

const forecastElement = document.getElementById("forecast");

const searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

displayForecast();
