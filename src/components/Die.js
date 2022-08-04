import React from "react";

export default function Die(props) {
  const dieColour = {
    backgroundColor: props.isHeld ? "black" : "white",
  };
  const pipsColour = {
    backgroundColor: props.isHeld ? "white" : "black",
  };
  /**
   * Generate the number of pip elements required based on the die face value
   * @param {number} value the value of the die face (1 to 6)
   * @returns die element with pip elements
   */
  function die(value) {
    const pips = [];
    for (var i = 0; i < value; i++) {
      pips.push(<span className="pip" key={i} style={pipsColour}></span>);
    }
    return (
      <div
        className="die"
        style={dieColour}
        onClick={props.start ? props.holdDice : undefined}
      >
        {pips}
      </div>
    );
  }

  return die(props.value);
}
