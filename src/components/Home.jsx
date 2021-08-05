import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

export const Home = () => {
  const [newsFeed, setNewsFeed] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [pageNumber, setPageNumber] = useState(0);

  const loadingFeed = (page = 1) => {
    fetch(
      `https://content.guardianapis.com/search?page=${page}&api-key=9215094c-0a04-4ea0-ac62-b8b0bc96ca02`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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

  // const newsPerPage = 5;
  const displayNews = (newsFeed) => {
    console.log(newsFeed);
    return newsFeed.response.results.map((news) => {
      return (
        <li key={news.id}>
          <a href={news.webUrl} target="_blank" rel="noopener noreferrer">
            {news.webTitle}
          </a>
        </li>
      );
    });
  };

  useEffect(() => {
    loadingFeed();
  }, []);

  console.log(newsFeed);
  const pageCount = (newsFeed) => {
    console.log(newsFeed);
    return newsFeed.response.pages;
  };

  return (
    <div className="App">
      {error && <div>{error}</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {newsFeed.length !== 0 && !error ? displayNews(newsFeed) : null}
        </ul>
      )}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={newsFeed.length !== 0 && !error ? pageCount(newsFeed) : null}
        onPageChange={(data) => loadingFeed(data.selected + 1)}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
};

// return (
//   <div className="App">
//     {error && <div>{error}</div>}
//     {isLoading ? (
//       <div>Loading...</div>
//     ) : (
//       <ul>
//         {newsFeed?.response?.results.map((news) => {
//           return (
//             <li key={news.id}>
//               <a href={news.webUrl} target="_blank" rel="noopener noreferrer">
//                 {news.webTitle}
//               </a>
//             </li>
//           );
//         })}
//       </ul>
//     )}
//   </div>
// );
