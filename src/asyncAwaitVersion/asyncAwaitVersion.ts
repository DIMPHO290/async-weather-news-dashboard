import "dotenv/config";
import { fetchNews } from "./fetchNews";
import { fetchWeather } from "./fetchWeather";

const weatherApiKey = process.env.VITE_WEATHER_API_KEY as string;
const newsApiKey = process.env.VITE_NEWS_API_KEY as string;

async function weatherInfo() {
  try {
    const weather = await fetchWeather(weatherApiKey, "Polokwane");
    console.log("City:", weather.name);
    console.log("Temperature:", Math.round(weather.temp), "°C");
    console.log("Weather:", weather.description);

    const news = await fetchNews(newsApiKey);
    console.log("\nHeadlines News:");
    news.slice(0, 5).forEach((n, i) => {
      console.log(`${i + 1}. ${n.description}`);
    });
  } catch (err: any) {
    console.error("Error:", err.message);
  }
}

weatherInfo();
