import { useState, useEffect } from "react";

export const Home = () => {
  const [newsFeed, setNewsFeed] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const loadingFeed = async () => {
    await fetch(
      "https://content.guardianapis.com/search?api-key=9215094c-0a04-4ea0-ac62-b8b0bc96ca02"
    )
      .then((response) => response.json())
      .then((data) => {
        setNewsFeed(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    loadingFeed();
  }, []);

  console.log(newsFeed);

  return (
    <div className="App">
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <ul>
          {newsFeed.response.results.map((news) => {
            return (
              <li key={news.id}>
                {news.webTitle}
                <a href={news.apiUrl}></a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
