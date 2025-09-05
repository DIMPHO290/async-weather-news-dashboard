import https from "https";
import { WeatherData } from "../CallBack/type/weatherData";


export function fetchWeather(apiKey: string, city: string): Promise<WeatherData> {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  return new Promise((resolve, reject) => {
    https
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
            resolve(weather);
          } catch (err) {
            reject(err);
          }
        });
      })
      .on("error", reject);
  });
}
