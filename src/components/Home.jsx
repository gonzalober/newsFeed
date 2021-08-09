import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Bookmarks } from "./Bookmarks";
import Image from "../assets/bookMark.png";

function ConvertMinutes(num) {
  let d = Math.floor(num / 1440);
  let h = Math.floor((num - d * 1440) / 60);
  let m = Math.round(num % 60);

  if (d > 0) {
    return d + " days, " + h + " hours, " + m + " minutes";
  } else {
    return h + " hours, " + m + " minutes";
  }
}
const getEvenDaysDiff = (d) => {
  let now = new Date();
  const oneDay = 24 * 60 * 60 * 10;
  let dateLastOff = d.slice(0, -1);
  let [yyyy, mm, dd, hh, mi, ss] = dateLastOff.split(/[/:\-T]/);
  let formatConcat = `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
  let then = new Date(formatConcat);

  let result = ConvertMinutes(Math.round(now - then) / oneDay);
  return result;
};

export const Home = () => {
  const [newsFeed, setNewsFeed] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [newsArray, setNewsArray] = useState([]);

  const loadingFeed = (page = 1) => {
    fetch(
      `https://content.guardianapis.com/search?page=${page}&show-fields=all&api-key=9215094c-0a04-4ea0-ac62-b8b0bc96ca02`
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

  const displayNews = (newsFeed) => {
    return newsFeed.response.results.map((news) => {
      return (
        <li key={news.id}>
          <a
            className="title"
            href={news.webUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>{news.webTitle}</p>

            <img className="images" src={news.fields.thumbnail} alt="new"></img>
          </a>
          <img
            src={Image}
            alt=""
            onClick={addNews(news.webTitle)}
            className="bookmarkImg"
          ></img>
          <p>{getEvenDaysDiff(news.webPublicationDate)} ago.</p>
        </li>
      );
    });
  };
  const addNews = () => {
    // setNewsArray([...newsArray, { key: "" }]);
  };

  useEffect(() => {
    loadingFeed();
  }, []);

  const pageCount = (newsFeed) => {
    return newsFeed.response.pages;
  };

  const handleClick = () => {};

  return (
    <div className="App">
      <button>Home</button>

      <Bookmarks handleClick={handleClick} />

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
