import { useHistory, useLocation } from "react-router-dom";

export const Bookmarks = () => {
  const history = useHistory();
  const location = useLocation([]);

  const routeChange = (event) => {
    event.preventDefault();
    let path = `/`;
    history.push(path);
  };

  const checkArray = () => {
    console.log(location.array);
  };
  checkArray();

  return (
    <div className="bookmarks">
      <h1>My Bookmarks</h1>
      <button onClick={routeChange}>Home</button>
      {location.array.map((x) => {
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
