const searchInput = document.getElementById("weatherSearchBar");
const searchButton = document.getElementById("weatherSearchBtn");
const searchDisplay = document.getElementById("weatherDisplayBox");

const API_KEY = "dd914484000bb9faff1f62ad08c4111e";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const displayWeather = (weather) => {
  const options = {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const formattedDate = new Date().toLocaleDateString("en-US", options);

  const html = `
    <div class="weather__city">
        <h2 class="weather__city--name">${weather.city}</h2>
        <p class="weather__city--date">${formattedDate}</p>
    </div>
    <div class="weather__temp">
        <div class="weather__temp--value">${weather.temp}°C</div>
        <div class="weather__icon">
            <img class="weather__icon--image" src="http://openweathermap.org/img/wn/${weather.icon}.png" alt="${weather.description}">
        </div>
    </div>
    <div class="weather__details">
        <div class="weather__details--humidity">
            <h3 class="weather__details--title">Humidity</h3>
            <p class="weather__details--value">${weather.humidity}%</p>
        </div>
        <div class="weather__details--wind">
            <h3 class="weather__details--title">Wind Speed</h3>
            <p class="weather__details--value">${weather.wind} km/h</p>
        </div>
        <div class="weather__details--feels-like">
            <h3 class="weather__details--title">Feels Like</h3>
            <p class="weather__details--value">${weather.feelsLike}°C</p>
        </div>
    </div>
`;
  searchDisplay.innerHTML = html;
};

const getWeather = async (city) => {
  try {
    searchDisplay.innerHTML = `<p>Loading...</p>`;
    const response = await fetch(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    const weather = {
      city: data.name,
      temp: Math.round(data.main.temp),
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      feelsLike: Math.round(data.main.feels_like),
    };

    displayWeather(weather);
  } catch (error) {
    searchDisplay.innerHTML = `<p>${error.message}</p>`;
  }
};

searchButton.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (!city) {
    searchDisplay.innerHTML = `<p>Please enter a city name!</p>`;
    return;
  }
  getWeather(city);
});
