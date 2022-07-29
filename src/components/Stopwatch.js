import React, { useState, useEffect } from "react";

export default function Stopwatch(props) {
  const [timeMs, setTimeMs] = useState(0);
  const [timeSec, setTimeSec] = useState(0);
  const [timeMin, setTimeMin] = useState(0);

  useEffect(() => {
    let intervalId;
    if (props.start) {
      intervalId = setInterval(() => {
        setTimeMs((prevTimeMs) => {
          return prevTimeMs + 10;
        });
        if (timeMs === 1000) {
          setTimeSec((prevTimeSec) => {
            return prevTimeSec + 1;
          });
          setTimeMs(0);
        }
        if (timeSec === 60) {
          setTimeMin((prevTimeMin) => {
            return prevTimeMin + 1;
          });
          setTimeSec(0);
        }
      }, 10);
    } else if (!props.start) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [timeMs, timeSec, timeMin, props.start]);

  return (
    <div className="stopwatch">
      <div className="numbers">
        <span>{timeMin} minutes </span>
        <span>{timeSec} seconds </span>
        <span>{timeMs} milliseconds </span>
      </div>
    </div>
  );
}
