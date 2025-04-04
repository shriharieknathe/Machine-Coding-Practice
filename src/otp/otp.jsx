import React, { useEffect, useRef, useState } from "react";
import "./otp.css";

const Otp = () => {
  const [inputValue, setInputValue] = useState(new Array(5).fill(""));

  const inputRef = useRef([]);

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  const onChangeHandler = (value, index) => {
    if (isNaN(value)) return;

    const newValue = value.trim();
    const newArr = [...inputValue];
    newArr[index] = newValue.slice(-1);
    setInputValue(newArr);
    newValue && inputRef.current[index + 1]?.focus();
  };

  function onBackSpaceHandler(e, index) {
    if (!e.target.value && e.key == "Backspace") {
      inputRef.current[index - 1]?.focus();
    }
  }
  return (
    <div className="opt_container">
      <h1> OTP Verification</h1>
      <div className="input_wrapper">
        {inputValue.map((value, index) => {
          return (
            <input
              key={index}
              className="input_section"
              onChange={(e) => onChangeHandler(e.target.value, index)}
              value={inputValue[index]}
              ref={(input) => (inputRef.current[index] = input)}
              onKeyDown={(e) => onBackSpaceHandler(e, index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Otp;
