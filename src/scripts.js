function displayTemperature(response) {
  console.log(response.data);
  let temperature = document.querySelector("#temperature");
  let city = document.querySelector("h1");
  let conditions = document.querySelector("#conditions");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  temperature.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  conditions.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
  wind.innerHTML = "Wind: " + Math.round(response.data.wind.speed) + " mph";
}

let city = "New York";
let apiKey = "b81214d7dc51d729ec2db083181120c3";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayTemperature);
