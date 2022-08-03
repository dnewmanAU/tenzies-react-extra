import React from "react";

export default function Score(props) {
  function score() {
    return (
      <div className="scores">
        <span>
          {"Time: "}
          {props.time}
          {"s"}
        </span>
        <br />
        <span>
          {"Rolls: "}
          {props.rolls}
        </span>
      </div>
    );
  }

  return score();
}
