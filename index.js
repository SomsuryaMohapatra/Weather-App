const api_key = "ccbd3694498a5e7833b41fbdcf98f75a";

const form = document.querySelector("form");
const search_input = document.querySelector("#search");
const weather_div = document.querySelector("#weather-div");

const getWeather = async (city) => {
  weather_div.innerHTML = `<h2>Loading ...</h2>`;
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
  const response = await fetch(api);
  const weather_data = await response.json();

  return showWeather(weather_data);
};

const showWeather = (weatherData) => {
  if (weatherData.cod == 404) {
    return (weather_div.innerHTML = `<h2>City Not Found</h2>`);
  }
  const image_api = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  weather_div.innerHTML = `
    <div>
        <img src=${image_api} alt="" sizes="" srcset="" />
    </div>
    <div id="temp-div">
        <p>${weatherData.main.temp}°C</p>
        <p>${weatherData.weather[0].main}</p>
    </div>
    `;
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather(search_input.value);
});
