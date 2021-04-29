import React from "react";

export default function Card(props) {
  return (
    <div className="card">
      {props.task}
      {/* <div className="card_title"></div> */}
      {/* <div className="card_description">test</div>
      <div className="tasks">test</div> */}
    </div>
  );
}
