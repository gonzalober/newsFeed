import { useHistory } from "react-router-dom";

const Bookmarks = () => {
  const history = useHistory();
  const result = () => {
    return localStorage.getItem("key")
      ? JSON.parse(localStorage.getItem("key"))
      : [];
  };

  const routeChange = (event) => {
    event.preventDefault();
    let path = `/`;
    history.push(path);
  };

  return (
    <div className="bookmarks">
      <h1>My Bookmarks</h1>
      <button onClick={routeChange}>Home</button>
      {result().map((x) => {
        return (
          <ul key={x.id}>
            <div className="bookmarkslist">
              <a
                className="title"
                href={x.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {x.title}
              </a>
            </div>
          </ul>
        );
      })}
    </div>
  );
};

export default Bookmarks;
