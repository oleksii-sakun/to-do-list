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
      {props.buttons}
    </div>
  );
}
