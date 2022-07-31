import React, { useEffect } from "react";

export default function Timer(props) {
  useEffect(() => {
    let interval;
    if (props.start) {
      interval = setInterval(() => {
        props.setTimeMs((prevTimeMs) => prevTimeMs + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.start]); // true

  function formatTime(type) {
    if (type === "ms") {
      return (props.timeMs / 10) % 100;
    } else if (type === "sec") {
      return Math.floor((props.timeMs / 1000) % 60);
    } else if (type === "min") {
      return Math.floor((props.timeMs / 60000) % 60);
    }
  }

  return (
    <div className="timer">
      <span>
        {formatTime("min") >= 10 ? formatTime("min") : "0" + formatTime("min")}:
      </span>
      <span>
        {formatTime("sec") >= 10 ? formatTime("sec") : "0" + formatTime("sec")}:
      </span>
      <span>
        {formatTime("ms") >= 10 ? formatTime("ms") : "0" + formatTime("ms")}
      </span>
    </div>
  );
}
