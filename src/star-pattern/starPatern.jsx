import React, { useState } from "react";
import "./starPattern.css";

const StarPattern = () => {
  const arr = new Array(5).fill(0);

  const [rating, setRating] = useState();
  const [hover, setHover] = useState();

  return (
    <div className="star-container">
      {arr.map((value, index) => {
        return (
          <span
            key={index}
            className={`star ${
              (hover === 0 && index < rating) || index < hover ? "colored" : ""
            }`}
            onClick={() => setRating(index + 1)}
            onMouseEnter={() => setHover(index + 1)}
            onMouseLeave={() => setHover(0)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default StarPattern;
