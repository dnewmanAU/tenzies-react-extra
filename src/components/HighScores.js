import React, { useState } from "react";
import { Link } from "react-router-dom";
import Score from "./Score";

export default function HighScores() {
  // Just get the data from local storage and use state to update the page
  const [highScores, setHighScores] = useState(() => {
    const data = JSON.parse(localStorage.getItem("highScores" || []));
    if (data !== null) {
      data.sort((a, b) => a.time - b.time);
      return data;
    } else {
      return []; // or an empty array if it doesn't exist
    }
  });

  // Ensure the sort button is always responsive
  const [sortType, setSortType] = useState("time");

  /**
   * Sorts high scores based on roll count or time
   * Toggles type so the button is always responsive
   */
  function sortScores() {
    if (sortType === "time") {
      setHighScores(highScores.sort((a, b) => a.rolls - b.rolls));
      setSortType("rolls"); // ensure sort type is responsive on each click
    } else if (sortType === "rolls") {
      setHighScores(highScores.sort((a, b) => a.time - b.time));
      setSortType("time");
    }
  }

  /**
   * Clears high scores in local storage
   */
  function clearScores() {
    localStorage.clear();
    localStorage.setItem("highScores", JSON.stringify([]));
    setHighScores(JSON.parse(localStorage.getItem("highScores" || []))); // trigger update
  }

  // Array of score componenets
  const scores = highScores.map((score, index) => (
    <Score key={index} rolls={score.rolls} time={score.time} />
  ));

  return (
    <div className="highscores-container">
      <div className="highscores-buttons">
        <Link to="/">
          <button className="button">
            {"Back"}
          </button>
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
