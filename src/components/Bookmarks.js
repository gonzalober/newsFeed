import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export const Bookmarks = ({ newsArray }) => {
  const history = useHistory();

  const routeChange = (event) => {
    event.preventDefault();
    let path = `/`;
    // let history = useHistory();
    history.push(path);
  };

  const checkArray = () => {
    console.log(typeof newsArray);
  };
  checkArray();
  return (
    <div>
      HOLA BOOKMARKS
      <h3>{newsArray}</h3>
      <button onClick={routeChange}>Home</button>
    </div>
  );
};
