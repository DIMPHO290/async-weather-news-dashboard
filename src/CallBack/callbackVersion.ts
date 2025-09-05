import "dotenv/config";
import { fetchNews } from "./fetchNews";
import { fetchWeather } from "./fetchWeather";

const weatherApiKey = process.env.VITE_WEATHER_API_KEY as string;
const newsApiKey = process.env.VITE_NEWS_API_KEY as string;

fetchWeather(weatherApiKey, "Polokwane", (weatherError, weather) => {
  if (weatherError) {
    console.error(" Weather Error:", weatherError.message);
  } else if (weather) {
    console.log("City:", weather.name);
    console.log("Temperature:", weather.temp, "°C");
    console.log(" Weather:", weather.description);
  }
});

fetchNews(newsApiKey, (newsError, news) => {
  if (newsError) {
    console.error(" News Error:", newsError.message);
  } else if (news) {
    console.log("\n Headlines News:");
    news.slice(0, 5).forEach((n, i) => {
      console.log(`${i + 1}. ${n.title}`);
    });
  }
});
