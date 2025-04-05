import React, { useRef } from "react";
import "./toastMessage.css";
import { useState } from "react";

const ToastMessage = () => {
  const [toastList, setToastList] = useState([]);
  const [shiftButton, setShiftButton] = useState("left");

  const timeRef = useRef({});
  console.log(timeRef);

  const onCloseClick = (id) => {
    clearInterval(timeRef.current[id]);
    delete timeRef.current[id];
    setToastList((prev) => {
      const newArr = prev.filter((item) => item.id != id);
      return newArr;
    });
  };

  const onButtonClick = (message, type) => {
    const id = new Date().getTime();
    const newList = [...toastList, { id, message, type }];
    setToastList(newList);

    timeRef.current[id] = setTimeout(() => onCloseClick(id), 5000);
  };

  return (
    <div className="toast_component">
      <div
        className={`toast_container`}
        style={{
          [shiftButton]: "10px",
        }}
      >
        {toastList.map((item) => {
          return (
            <div
              key={item.id}
              className={`toast ${item.type}`}
              style={{
                animation:
                  shiftButton === "right" ? "slide-right 1s" : "slide-left 1s",
              }}
            >
              {item.message}
              <span onClick={() => onCloseClick(item.id)}>X</span>
            </div>
          );
        })}
      </div>
      <div className="box">
        <div className="button_container">
          <button
            className="btn"
            onClick={() => onButtonClick("Success", "success")}
          >
            Success
          </button>
          <button
            className="btn"
            onClick={() => onButtonClick("Warning", "warning")}
          >
            Warning
          </button>
          <button
            className="btn"
            onClick={() => onButtonClick("Error", "error")}
          >
            Error
          </button>
          <button className="btn" onClick={() => onButtonClick("Info", "info")}>
            Info
          </button>
        </div>
        <div className="shift">
          <button
            disabled={shiftButton === "left"}
            className="btn"
            onClick={() => setShiftButton("left")}
          >
            left
          </button>
          <button
            disabled={shiftButton === "right"}
            className="btn"
            onClick={() => setShiftButton("right")}
          >
            right
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToastMessage;
