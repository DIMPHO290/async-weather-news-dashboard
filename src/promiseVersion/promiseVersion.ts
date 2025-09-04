import "dotenv/config";

import { fetchWeather } from "./fetchWeather";

const weatherApiKey = process.env.VITE_WEATHER_API_KEY as string;

fetchWeather(weatherApiKey, "Polokwane").then((weather) => {
  console.log("City:", weather.name);
  console.log("Temperature:", weather.temp, "°C");
  console.log("Weather:", weather.description);
});
