import "./App.css";

import React, { useState, useEffect } from "react";
import Die from "./components/Die";
import Timer from "./components/Timer";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [start, setStart] = useState(false);
  const [timeMs, setTimeMs] = useState(0);
  const [rollCount, setRollCount] = useState(0);
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      setStart(false);
    }
  }, [dice]); // will run every time the dependencies change ([dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

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

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

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
        <button className="roll-button" onClick={rollDice}>
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
        <button className="scores-button" onClick={console.log("clicked me")}>
          {"High Scores"}
        </button>
      </div>
    </div>
  );
}
