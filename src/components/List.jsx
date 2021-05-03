import React from "react";

export default function List(props) {
  return (
    <div className="list_item">
      <h1>{props.title}</h1>
      {props.addColumnButton}
      {props.deleteColumnButton}
      {props.children}
    </div>
  );
}
