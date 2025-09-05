import https from "https";
import { NewsData } from "../callBack/type/weatherData"; 

export function fetchNews(apiKey: string): Promise<NewsData[]> {
  const url = `https://api.mediastack.com/v1/news?access_key=${apiKey}&countries=za&limit=5`;

  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));

        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            const articles: NewsData[] = (json.data || []).map((a: any) => ({
              description: a.title || a.description || "No description",
            }));
            resolve(articles);
          } catch (err) {
            reject(err);
          }
        });
      })
      .on("error", reject);
  });
}
