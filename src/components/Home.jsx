import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Image from "../assets/bookMark.png";
const API_KEY = process.env.REACT_APP_BASE_URL;

function ConvertMinutes(num) {
  let d = Math.floor(num / 1440);
  let h = Math.floor((num - d * 1440) / 60);
  let m = Math.round(num % 60);

  if (isNaN(d)) {
    console.log("hola");
    return "posting date hasn't been taken";
  } else {
    if (d > 0) {
      return d + " days, " + h + " hours, " + m + " minutes";
    } else {
      return h + " hours, " + m + " minutes";
    }
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

const checkInclude = (arr, obj) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].title === obj.title) return true;
  }
  return false;
};

const Home = () => {
  const [newsFeed, setNewsFeed] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [newsArray, setNewsArray] = useState(() => {
    const localSavedBookmarks = localStorage.getItem("key");
    return localSavedBookmarks ? JSON.parse(localSavedBookmarks) : [];
  });
  const history = useHistory();

  const loadingFeed = (page = 1) => {
    const url = `https://content.guardianapis.com/search?page=${page}&show-fields=all&api-key=${API_KEY}`;
    fetch(url)
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
          <div className="card">
            <div className="cardContent">
              <a
                className="title"
                href={news.webUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>{news.webTitle}</p>

                <img
                  className="images"
                  src={news.fields.thumbnail}
                  alt="new"
                ></img>
              </a>
              <img
                className="bookmarkImg"
                type="checkbox"
                src={Image}
                alt=""
                onClick={() =>
                  addNews({
                    title: news.webTitle,
                    link: news.webUrl,
                    date: news.fields.lastModified,
                  })
                }
              ></img>
              <p className="time">
                {getEvenDaysDiff(news.webPublicationDate)} ago.
              </p>
            </div>
          </div>
        </li>
      );
    });
  };

  const addNews = (newsProperties) => {
    if (!checkInclude(newsArray, newsProperties)) {
      newsArray.push(newsProperties);
    }
    for (let i = 0; i < newsArray.length; i++) {
      newsArray[i].date = new Date(newsArray[i].date);
    }
    console.log(newsArray);
    newsArray.sort((a, b) => {
      return b.date - a.date;
    });

    localStorage.setItem("key", JSON.stringify(newsArray));
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
    history.push(path);
    console.log(newsArray);
  };

  return (
    <div className="app">
      <h1>Latest world News!</h1>
      <button onClick={routeChange}>Go to your Favorites News</button>
      {error && <div>{error}</div>}
      {isLoading ? (
        <h1>Loading...</h1>
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

export default Home;
