import "dotenv/config";
import { fetchNews } from "./fetchNews";
import { fetchWeather } from "./fetchWeather";

const weatherApiKey = process.env.VITE_WEATHER_API_KEY as string;
const newsApiKey = process.env.VITE_NEWS_API_KEY as string;

fetchWeather(weatherApiKey, "Polokwane")
  .then((weather) => {
    console.log("City:", weather.name);
    console.log("Temperature:", Math.round(weather.temp), "°C");
    console.log("Weather:", weather.description);

    return fetchNews(newsApiKey);
  })
  .then((news) => {
    console.log("\nHeadlines News:");
    news.forEach((n, i) => {
      console.log(`${i + 1}. ${n.description}`);
    });
  })
  .catch((err) => {
    console.error("Error:", err.message);
  });
