import http from "http";
import { WeatherData } from "./type/weatherData";

export type WeatherCallback = (error: Error | null, data?: WeatherData) => void;

export function fetchWeather(
  apiKey: string,
  city: string,
  callback: WeatherCallback
) {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  http
    .get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));

      res.on("end", () => {
        try {
          const json = JSON.parse(data);

          const weather: WeatherData = {
            name: json.name,
            temp: json.main.temp,
            description: json.weather[0].description,
          };

          callback(null, weather);
        } catch (err) {
          callback(err as Error);
        }
      });
    })
    .on("error", (err: Error) => callback(err));
}
