import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
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
  const history = useHistory();

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
            onClick={() => addNews({ title: news.webTitle, link: news.webUrl })}
            className="bookmarkImg"
          ></img>
          <p className="time">
            {getEvenDaysDiff(news.webPublicationDate)} ago.
          </p>
        </li>
      );
    });
  };
  const addNews = (newsProperties) => {
    newsArray.push(newsProperties);
  };

  useEffect(() => {
    loadingFeed();
    setNewsArray(newsArray);
  }, [newsArray]);

  const pageCount = (newsFeed) => {
    return newsFeed.response.pages;
  };

  const routeChange = (event) => {
    event.preventDefault();
    let path = `bookmarks`;

    history.push({
      pathname: path,
      array: newsArray,
    });
    console.log(newsArray);
  };

  return (
    <div className="App">
      <button onClick={routeChange}>Bookmarks</button>
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
        marginPagesDisplayed={0}
        pageRangeDisplayed={5}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
};
