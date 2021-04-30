import React from "react";

export default function Card(props) {
  return (
    <div className="card">
      <button
        className="left_card_button"
        onClick={props.handleActionForLeftButtton}
      >
        {props.textForTheLeftButton}
      </button>
      {props.task}
      <button
        onClick={props.handleActionForRightButton}
        className="right_card_button"
      >
        {props.textForTheRightButton}
      </button>
    </div>
  );
}
