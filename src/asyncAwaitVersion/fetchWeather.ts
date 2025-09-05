// import { WeatherData } from "../callBack/type/weatherData";
import { WeatherData } from "../CallBack/type/weatherData";

export async function fetchWeather(
  apiKey: string,
  city: string
): Promise<WeatherData> {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const res = await fetch(url);
  const json = await res.json();

  if (!json || !json.main || !json.weather) {
    throw new Error("Failed to fetch weather data");
  }

  const weather: WeatherData = {
    name: json.name,
    temp: json.main.temp,
    description: json.weather[0].description,
  };

  return weather;
}
