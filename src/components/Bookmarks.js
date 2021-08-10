import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export const Bookmarks = ({ handleClick }) => {
  const history = useHistory();

  const routeChange = (event) => {
    event.preventDefault();
    let path = `/`;
    // let history = useHistory();
    history.push(path);
  };
  return (
    <div handleClick>
      HOLA BOOKMARKS
      <button onClick={routeChange}>Home</button>
    </div>
  );
};
