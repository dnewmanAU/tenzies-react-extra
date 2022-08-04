import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Die from "./Die";
import Timer from "./Timer";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function Game() {
  const [start, setStart] = useState(false);
  const [timeMs, setTimeMs] = useState(0);
  const [rollCount, setRollCount] = useState(0);
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  /**
   * On first render check if highScores exists in local storage
   * If not, create an empty local storage array to house generated scores
   * Otherwise do nothing
   */
  useEffect(() => {
    const data = localStorage.getItem("highScores");
    if (data === null) {
      localStorage.setItem("highScores", JSON.stringify([]));
    }
    localStorage.setItem("sortType", "time");
  }, []);

  /**
   * Runs everytime dice dependency changes to see if the game is won
   * Every dice must be held and every dice value must be the same
   */
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      setStart(false);
      scoreToStorage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dice]); // will run every time the dependencies change ([dice])

  /**
   * Generates a random die from 1 to 6 with a unique identifier via nanoid
   * Every die defaults to not being held
   * @returns the generated die with attributes
   */
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  /**
   * Generates a set of 10 new die
   * Only called when a new game starts
   * @returns an array with 10 die from the generateNewDie function
   */
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 2; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  /**
   * Called everytime the rollDice button is clicked and the main logic is executed
   * Sets the game status to started, increments the roll counter, generates new die for unheld dice
   * If the game is won it will setup a new game with new dice and reset time and roll count
   */
  function rollDice() {
    if (!tenzies) {
      if (!start) {
        setStart(true);
        setRollCount(1);
      } else {
        setRollCount((prevRollCount) => {
          return prevRollCount + 1;
        });
        setDice((oldDice) =>
          oldDice.map((die) => {
            // if die is held (true) just return the die, otherwise get a new one
            return die.isHeld ? die : generateNewDie();
          })
        );
      }
    } else {
      setTenzies(false);
      setStart(true);
      setTimeMs(0);
      setRollCount(1);
      setDice(allNewDice());
    }
  }

  /**
   * Upon a finished game get the number of rolls and time taken in seconds to 2 decimals
   * @returns high score object
   */
  function generateHighScore() {
    return {
      rolls: rollCount,
      time: Math.floor((timeMs / 1000) % 60) + "." + ((timeMs / 10) % 100),
    };
  }

  /**
   * Stores the high score to local storage that persists between games and refreshes
   */
  function scoreToStorage() {
    const scores = JSON.parse(localStorage.getItem("highScores" || []));
    scores.push(generateHighScore());
    scores.sort((a, b) => a.time - b.time); // sort by time in ascending order
    localStorage.setItem("highScores", JSON.stringify(scores));
    localStorage.setItem("sortType", "time");
  }

  /**
   * Toggles isHeld boolean attribute on a specified die
   * @param {number} id A unique identifier for each die
   */
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  /**
   * Array of custom die components with attributes
   *
   * key = unique die identifier
   * value = the die face value from 1 to 6
   * isHeld = boolean for the user clicking the die
   * holdDice = function that toggles isHeld boolean
   * start = boolean for whether the game has started
   */
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
      start={start}
    />
  ));

  return (
    <div className="main-container">
      <main className="play-area">
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="button" onClick={rollDice}>
          {tenzies ? "New Game" : start ? "Roll Dice" : "Start Game"}
        </button>
      </main>
      <hr />
      <div className="stats-container">
        {tenzies ? (
          <h2>
            You took {Math.floor((timeMs / 1000) % 60)}.{(timeMs / 10) % 100}{" "}
            seconds!
          </h2>
        ) : (
          <Timer start={start} timeMs={timeMs} setTimeMs={setTimeMs} />
        )}
        <div className="rolls">
          <h5 className="rolls-text">Rolls:</h5>
          <h2 className="roll-count">{rollCount}</h2>
        </div>
        <Link to="/highscores">
          <button className="button">{"High Scores"}</button>
        </Link>
      </div>
    </div>
  );
}
