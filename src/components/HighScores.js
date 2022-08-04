import React, { useState } from "react";
import { Link } from "react-router-dom";
import Score from "./Score";

export default function HighScores() {
  const data = JSON.parse(localStorage.getItem("highScores" || []));
  
  const [sortType, setSortType] = useState(() => {
    if (localStorage.getItem("sortType") === "time") {
      return "rolls";
    } else {
      return "time";
    }
  });

  const [highScores, setHighScores] = useState(() => {
    if (data !== null) {
      return data;
    } else {
      return [];
    }
  });

  function sortScores() {
    if (sortType === "time") {
      //const scores = JSON.parse(localStorage.getItem("highScores" || []));
      setHighScores(highScores.sort((a, b) => a.rolls - b.rolls));
      setSortType("rolls"); // change sort next time
      localStorage.setItem("highScores", JSON.stringify(highScores));
      localStorage.setItem("sortType", "rolls");
    } else if (sortType === "rolls") {
      //const scores = JSON.parse(localStorage.getItem("highScores" || []));
      setHighScores(highScores.sort((a, b) => a.time - b.time));
      setSortType("time");
      localStorage.setItem("highScores", JSON.stringify(highScores));
      localStorage.setItem("sortType", "time");
    }
  }

  function clearScores() {
    localStorage.clear();
    localStorage.setItem("highScores", JSON.stringify([]));
    setHighScores(JSON.parse(localStorage.getItem("highScores" || [])));
  }

  const scores = data.map((score, index) => (
    <Score key={index} rolls={score.rolls} time={score.time} />
  ));

  return (
    <div className="highscores-container">
      <div className="highscores-buttons">
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
