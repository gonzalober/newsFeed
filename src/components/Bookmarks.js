import { useState, useEffect } from "react";

export const Bookmarks = ({ handleClick }) => {
  return (
    <div handleClick>
      HOLA BOOKMARKS
      <button className="btn btn-primary" onClick={handleClick}></button>
    </div>
  );
};
