import React from "react";
import { Card } from "semantic-ui-react";

export default function List(props) {
  return (
    <div className="list_item">
      {props.deleteColumnButton}
      <h1>{props.title}</h1>

      {props.addColumnButton}
      {props.children}
    </div>
  );
}
