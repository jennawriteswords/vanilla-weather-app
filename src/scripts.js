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

function displayTemperature(response) {
  let temperature = document.querySelector("#temperature");
  let conditions = document.querySelector("#conditions");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let pressure = document.querySelector("#pressure");
  let dateElement = document.querySelector("#date");
  let icon = document.querySelector("#icon");
  temperature.innerHTML = Math.round(response.data.main.temp);
  conditions.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
  wind.innerHTML = "Wind: " + Math.round(response.data.wind.speed) + " mph";
  pressure.innerHTML = "Pressure: " + response.data.main.pressure + " mb";
  dateElement.innerHTML =
    "Last Updated: " + formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
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

/*function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (14 * 9) / 5 + 32;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = fahrenheitTemperature;
}*/

//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", displayFahrenheit);

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

let current = document.querySelector("#current");
current.addEventListener("click", retrievePosition);

let search = document.querySelector("#search-form");
search.addEventListener("submit", searchCity);

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

initialPage();
