import React, { useEffect, useState } from "react";
import "./countdown_timer.css";
import EditTimer from "./EditTimer";

const Timer = () => {
  const [running, setRunning] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        if (time > 0) {
          setTime((prev) => prev - 1);
        } else {
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running]);

  const onStartClick = () => {
    setRunning((prev) => !prev);
  };
  const onResetClick = () => {
    setRunning(false);
    setTime(0);
  };
  const onEditClick = () => {
    setIsEdit(true);
  };

  const onTimeSet = (t) => {
    setTime(t);
    setIsEdit(false);
  };

  const hour = Math.floor(time / (60 * 60));
  const min = Math.floor((time / 60) % 60);
  const sec = Math.floor(time % 60);

  const formattedTime = (time) => (time > 9 ? time : `0${time}`);

  return (
    <div className="container">
      {isEdit ? (
        <EditTimer onTimeSet={onTimeSet} />
      ) : (
        <>
          <div className="input_time">
            {`${formattedTime(hour)} : ${formattedTime(min)} : ${formattedTime(
              sec
            )}`}{" "}
          </div>

          <div className="button_section">
            <button className="btn" onClick={onStartClick}>
              {running ? "Stop" : "Start"}
            </button>
            <button className="btn" onClick={onEditClick}>
              edit
            </button>
            <button className="btn" onClick={onResetClick}>
              reset
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Timer;
