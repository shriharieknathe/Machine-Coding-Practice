import { useRef, useState } from "react";
import "./toastMessage.css";

const ToastMessage = () => {
  const [toastList, setToastList] = useState([]);
  const [position, setPosition] = useState("top-right");

  const timeRef = useRef({});

  const onCloseClick = (id) => {
    clearInterval(timeRef.current[id]);
    delete timeRef.current[id];
    setToastList((prev) => prev.filter((item) => item.id !== id));
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
        className="toast_container"
        style={{
          [position.includes("left") ? "left" : "right"]: "10px",
          [position.includes("top") ? "top" : "bottom"]: "10px",
        }}
      >
        {toastList.map((item) => (
          <div
            key={item.id}
            className={`toast ${item.type}`}
            style={{
              animation:
                position === "top-right"
                  ? "slide-right 1s"
                  : position === "top-left"
                  ? "slide-left 1s"
                  : position === "bottom-right"
                  ? "slide-up 1s"
                  : "slide-up-left 1s",
            }}
          >
            {item.message}
            <span onClick={() => onCloseClick(item.id)}>X</span>
          </div>
        ))}
      </div>

      <div className="box">
        <div className="button_container">
          <button className="btn" onClick={() => onButtonClick("Success", "success")}>
            Success
          </button>
          <button className="btn" onClick={() => onButtonClick("Warning", "warning")}>
            Warning
          </button>
          <button className="btn" onClick={() => onButtonClick("Error", "error")}>
            Error
          </button>
          <button className="btn" onClick={() => onButtonClick("Info", "info")}>
            Info
          </button>
        </div>

        <div className="shift">
          <button
            disabled={position === "top-left"}
            className="btn"
            onClick={() => setPosition("top-left")}
          >
            Top Left
          </button>
          <button
            disabled={position === "top-right"}
            className="btn"
            onClick={() => setPosition("top-right")}
          >
            Top Right
          </button>
          <button
            disabled={position === "bottom-left"}
            className="btn"
            onClick={() => setPosition("bottom-left")}
          >
            Bottom Left
          </button>
          <button
            disabled={position === "bottom-right"}
            className="btn"
            onClick={() => setPosition("bottom-right")}
          >
            Bottom Right
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToastMessage;
