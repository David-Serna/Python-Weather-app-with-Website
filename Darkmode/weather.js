// get weather data from OpenWeatherMap API and display it on the web page
function getWeather(event) {
  event.preventDefault(); // prevent form from submitting
  const cityInput = document.getElementById("city-input");
  const cityName = cityInput.value;
  const apiKey = "30d4741c779ba94c470ca1f63045390a"; // add your OpenWeatherMap API key here

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Invalid city. Please try again.");
    })
    .then((data) => {
      const temperatureF = data.main.temp.toFixed(0) + "&deg;F"; // convert temperature to string and add degree symbol
      const temperatureC = ((data.main.temp - 32) * (5 / 9)).toFixed(0) + "&deg;C"; // convert temperature to string and add degree symbol
      const cityName = data.name;
      const windSpeed = data.wind.speed + " mph";
      const timeOfDay = new Date(data.dt * 1000).toLocaleTimeString(); // convert UNIX timestamp to local time

      const weatherResults = document.getElementById("weather-results");
      weatherResults.innerHTML = `
        <p>Temperature: ${temperatureF} / ${temperatureC}</p>
        <p>City: ${cityName}</p>
        <p>Wind Speed: ${windSpeed}</p>
        <p>Time of Day: ${timeOfDay}</p>
      `;
    })
    .catch((error) => {
      const weatherResults = document.getElementById("weather-results");
      weatherResults.innerHTML = `<p>${error.message}</p>`;
      setTimeout(() => {
        weatherResults.innerHTML = "";
      }, 5000);
    });
}

const weatherForm = document.getElementById("weather-form");
weatherForm.addEventListener("submit", getWeather);
