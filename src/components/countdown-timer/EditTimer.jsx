import React, { useState } from "react";
import "./countdown_timer.css";

const TIME = {
  HOUR: "HOUR",
  MINUTE: "MINUTE",
  SECOND: "SECOND",
};

const EditTimer = ({ onTimeSet }) => {
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setsec] = useState(0);

  const onValueChange = (input, type) => {
    if (isNaN(input)) return;
    if (input > 59) value = 59;
    switch (type) {
      case TIME.HOUR:
        setHour(input);
        break;
      case TIME.MINUTE:
        setMin(input);
        break;
      case TIME.SECOND:
        setsec(input);
        break;
      default:
        console.log("Someting is wrong");
    }
  };
  const onButtonClick = () => {
    const totalCount = hour * 3600 + min * 60 + parseInt(sec);
    onTimeSet(totalCount);
  };
  return (
    <>
      <div className="input-Handler">
        <input
          className="input"
          onChange={(e) => onValueChange(e.target.value, TIME.HOUR)}
          value={hour}
          maxLength={2}
        />
        <input
          className="input"
          onChange={(e) => onValueChange(e.target.value, TIME.MINUTE)}
          value={min}
          maxLength={2}
        />
        <input
          className="input"
          onChange={(e) => onValueChange(e.target.value, TIME.SECOND)}
          value={sec}
          maxLength={2}
        />
      </div>
      <button className="btn" onClick={onButtonClick}>
        Set
      </button>
    </>
  );
};

export default EditTimer;
