import React from "react";

export default function Die(props) {
  // CSS-in-JS
  const dieColour = {
    backgroundColor: props.isHeld ? "black" : "white",
  };
  // CSS-in-JS
  const pipsColour = {
    backgroundColor: props.isHeld ? "white" : "black",
  };

  function die(value) {
    const pips = [];
    for (var i = 0; i < value; i++) {
      pips.push(<span className="pip" style={pipsColour}></span>);
    }
    return (
      <div className="die" style={dieColour} onClick={props.start && props.holdDice}>
        {pips}
      </div>
    );
  }

  return die(props.value);
}
