import React from "react";

export default function Die(props) {
  // CSS-in-JS
  const dieColour = {
    backgroundColor: props.isHeld ? "black" : "white",
  };
  // CSS-in-JS
  const pipsColor = {
    color: props.isHeld ? "white" : "black",
  };

  return (
    <div className="die-face" style={dieColour} onClick={props.holdDice}>
      <h2 className="die-num" style={pipsColor}>
        {props.value}
      </h2>
    </div>
  );
}
