import React, { useState } from "react";
import "./gridLights.css";
import Cell from "./cell";

const GridLights = () => {
  const [order, setOrder] = useState([]);
  const [isDeactivatingCell, setIsDeactivatingCell] = useState(false);

  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  function deactivateCell() {
    setIsDeactivatingCell(true);

    const timer = setInterval(() => {
      setOrder((preOrder) => {
        const newOder = preOrder.slice();
        newOder.pop();

        if (newOder.length === 0) {
          clearInterval(timer);
          setIsDeactivatingCell(false);
        }

        return newOder;
      });
    }, 300);
  }

  const onCellClick = (index) => {
    const newOrder = [...order, index];
    setOrder(newOrder);

    if (newOrder.length == config.flat(1).filter(Boolean).length) {
      deactivateCell();
    }
  };

  return (
    <div className="grid_section">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${config[0].length},1fr)` }}
      >
        {config.flat(1).map((value, index) => {
          return value ? (
            <Cell
              key={index}
              filled={order.includes(index)}
              onClick={() => onCellClick(index)}
              disable={order.includes(index) || isDeactivatingCell}
            />
          ) : (
            <span />
          );
        })}
      </div>
    </div>
  );
};

export default GridLights;
