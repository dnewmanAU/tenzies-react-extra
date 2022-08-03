import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Score from "./Score";

export default function History() {
  const data = JSON.parse(localStorage.getItem("highScores" || []));
  const [sortType, setSortType] = useState(() => {
    if (localStorage.getItem("sortType") === "time") {
      return "rolls";
    } else {
      return "time";
    }
  });
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    const data = localStorage.getItem("highScores");
    if (data === null) {
      localStorage.setItem("highScores", JSON.stringify([]));
    }
    localStorage.setItem("sortType", "time");
  }, []);

  function sortScores() {
    if (sortType === "time") {
      const scores = JSON.parse(localStorage.getItem("highScores" || []));
      scores.sort((a, b) => a.rolls - b.rolls);
      localStorage.setItem("highScores", JSON.stringify(scores));
      localStorage.setItem("sortType", "rolls");
      setSortType("rolls");
    } else if (sortType === "rolls") {
      const scores = JSON.parse(localStorage.getItem("highScores" || []));
      scores.sort((a, b) => a.time - b.time);
      localStorage.setItem("highScores", JSON.stringify(scores));
      localStorage.setItem("sortType", "time");
      setSortType("time");
    }
  }

  function clearScores() {
    localStorage.clear();
    localStorage.setItem("highScores", JSON.stringify([]));
    forceUpdate();
  }

  const scores = data.map((score, index) => (
    <Score key={index} rolls={score.rolls} time={score.time} />
  ));

  return (
    <div className="history-container">
      <div className="history-buttons">
        <Link to="/">
          <button className="button">{"Back"}</button>
        </Link>
        <button className="button" onClick={sortScores}>
          {"Sort"}
        </button>
        <button className="button" onClick={clearScores}>
          {"Reset"}
        </button>
      </div>
      <h1 className="scores-title">High Scores</h1>
      <div className="scores-container">{scores}</div>
    </div>
  );
}
