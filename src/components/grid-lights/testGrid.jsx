import React, { useState } from "react";
import "./gridLights.css";

const TestGrid = () => {
  const config = [
    [0, 1, 1],
    [1, 0, 1],
    [1, 1, 0],
  ];

  const [order, setOrder] = useState([]);
  console.log(order);

  const deActivateHandler = () => {
    const interval = setInterval(() => {
      setOrder((prevOrder) => {
        const newOrder = prevOrder.slice();
        newOrder.pop();
        if (newOrder.length === 0) {
          clearInterval(interval);
        }
        return newOrder;
      });

      return () => clearInterval(interval);
    }, 300);
  };

  function onCellClick(row, col) {
    let newIndex = `${row}-${col}`;
    const newOrder = [...order, newIndex];
    setOrder(newOrder);

    if (newOrder.length === config.flat(1).filter(Boolean).length) {
      deActivateHandler();
    }
  }

  return (
    <div className="grid_container">
      {config.map((row, rowIndex) => (
        <div className="grid_row" key={rowIndex}>
          {row.map((col, colIndex) => (
            <div
              className={`grid ${col === 0 ? "disable" : ""} ${
                order.includes(`${rowIndex}-${colIndex}`) ? "active" : ""
              }`}
              key={colIndex}
              onClick={() => onCellClick(rowIndex, colIndex)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TestGrid;
