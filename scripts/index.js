function displayWeather(response) {
  const description = response.data.condition.description;
  const temperature = Math.round(response.data.temperature.current);
  const humidity = response.data.temperature.humidity;
  const weatherEmoji = response.data.condition.icon_url;
  const wind = response.data.wind.speed;
  cityElement.textContent = `${response.data.city}, ${response.data.country}`;
  iconELement.innerHTML = `<img src="${weatherEmoji}">`;
  temperatureELement.textContent = temperature;
  descriptionELement.textContent = description;
  humidityELement.textContent = `${humidity}%`;
  windELement.textContent = `${wind} km/h`;
  mainDisplay.style.display = "block";
}
function search(event) {
  event.preventDefault();
  const city = searchInputElement.value;
  const url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(url).then(displayWeather);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

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

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}
const mainDisplay = document.querySelector("main");
const currentDateELement = document.querySelector("#current-date");
const searchInputElement = document.querySelector("#search-input");
const cityElement = document.querySelector("#current-city");
const iconELement = document.querySelector(".current-temperature-icon");
const temperatureELement = document.querySelector(".current-temperature-value");
const descriptionELement = document.querySelector("#description");
const humidityELement = document.querySelector("#humidity");
const windELement = document.querySelector("#wind");

const searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

const currentDate = new Date();
currentDateELement.innerHTML = formatDate(currentDate);

const apiKey = "3c9b157d324o427adbae47ft0a08477e";
