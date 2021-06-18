function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
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
  return `${day} ${hour}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
    <div class="weather-forecast-date">${day}</div>
              <img src="src/partly_cloudy.png" width="50px" class="forecast-icon"/>
              <div class="weather-forecast-temps"><p><span class="forecast-temp-max">64°</span>/<span
              class="forecast-temp-min">46°</span></p></div>
              </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "b81214d7dc51d729ec2db083181120c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperature = document.querySelector("#temperature");
  let conditions = document.querySelector("#conditions");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let pressure = document.querySelector("#pressure");
  let dateElement = document.querySelector("#date");
  let icon = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  temperature.innerHTML = Math.round(celsiusTemperature);
  conditions.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
  wind.innerHTML = "Wind: " + Math.round(response.data.wind.speed) + " km/h";
  pressure.innerHTML = "Pressure: " + response.data.main.pressure + " mb";
  dateElement.innerHTML =
    "Last Updated: " + formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let h1 = document.querySelector("#city");
  h1.innerHTML = input.value;
  let city = input.value;
  let apiKey = "b81214d7dc51d729ec2db083181120c3";
  let units = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

function retrievePosition(position) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "b81214d7dc51d729ec2db083181120c3";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let coordsApiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  let coordinates =
    "(" + Math.round(latitude) + "°, " + Math.round(longitude) + "°)";
  let h1 = document.querySelector("h1");
  h1.innerHTML = coordinates;
  axios.get(coordsApiUrl).then(displayTemperature);
}

function initialPage() {
  let city = "New York";
  let h1 = document.querySelector("#city");
  h1.innerHTML = city;
  let apiKey = "b81214d7dc51d729ec2db083181120c3";
  let units = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

let currentCity = document.querySelector("#current");
currentCity.addEventListener("click", retrievePosition);

let search = document.querySelector("#search-form");
search.addEventListener("submit", searchCity);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

initialPage();
