import http from "http";
import { NewsData } from "./type/weatherData";

export type NewsCallback = (error: Error | null, data?: NewsData[]) => void;

export function fetchNews(apiKey: string, callback: NewsCallback) {
  const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}&countries=za`;

  http
    .get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));

      res.on("end", () => {
        try {
          const json = JSON.parse(data);

          if (!json.data) {
            return callback(
              new Error("No data field in response: " + JSON.stringify(json))
            );
          }

          const articles: NewsData[] = json.data.map((a: any) => ({
            title: a.title,
            description: a.description,
          }));

          callback(null, articles);
        } catch (err) {
          callback(err as Error);
        }
      });
    })
    .on("error", (err: Error) => callback(err));
}
