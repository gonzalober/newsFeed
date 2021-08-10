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
    <div>
      <h1>Bookmarks</h1>
      <button onClick={routeChange}>Home</button>
      {location.array.map((x) => {
        return (
          <ul key={x.id}>
            <a
              className="title"
              href={x.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {x.title}{" "}
            </a>
          </ul>
        );
      })}
    </div>
  );
};
