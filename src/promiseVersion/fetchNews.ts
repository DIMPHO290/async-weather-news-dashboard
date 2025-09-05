import https from "https";
import { WeatherData } from "../CallBack/type/weatherData";

export function fetchNews(apiKey: string): Promise<WeatherData[]> {
  return new Promise((resolve, reject) => {
    const url = `https://api.mediastack.com/v1/news?access_key=${apiKey}&countries=za&limit=5`;

    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));

        res.on("end", () => {
          try {
            const json = JSON.parse(data);

            if (!json.data) {
              return reject(
                new Error("No data field in response: " + JSON.stringify(json))
              );
            }

            const articles: WeatherData[] = json.data.map((a: any) => ({
              title: a.title,
              description: a.description,
            }));

            resolve(articles);
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", (err: Error) => reject(err));
  });
}
