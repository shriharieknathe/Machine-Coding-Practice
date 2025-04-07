import React from "react";
import "./gridLights.css";

const Cell = ({ filled, onClick, disable }) => {
  return (
    <button
      className={filled ? "cell cell-activate" : "cell"}
      onClick={onClick}
      disable={disable}
    ></button>
  );
};

export default Cell;
