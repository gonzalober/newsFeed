import { useState, useEffect } from "react";

export const Home = () => {
  const [newsFeed, setNewsFeed] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();

  const loadingFeed = () => {
    fetch(
      "https://content.guardianapis.com/search?api-key=9215094c-0a04-4ea0-ac62-b8b0bc96ca02"
    )
      .then((response) => response.json())
      .then((data) => {
        setNewsFeed(data);
        setLoading(false);
        setError(undefined);
      })
      .catch((er) => {
        console.error("Error:", er);
        setError(er.message);
        setLoading(false);
        setNewsFeed([]);
      });
  };
  // const loadingFeed = async () => {
  //   try {
  //     let response = await fetch(
  //       "https://content.guardianapis.com/search?api-key=9215094c-0a04-4ea0-ac62-b8b0bc96ca02"
  //     );
  //     const data = await response.json();
  //     setNewsFeed(data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  useEffect(() => {
    loadingFeed();
  }, []);

  console.log(newsFeed);

  return (
    <div className="App">
      {error && <div>{error}</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {newsFeed?.response?.results.map((news) => {
            return (
              <li key={news.id}>
                <a href={news.webUrl} target="_blank" rel="noopener noreferrer">
                  {news.webTitle}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
