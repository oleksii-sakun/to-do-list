import React from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";

export default function List(props) {
  return (
    <div className="list_item">
      <h1>{props.title}</h1>
      {props.children}
    </div>
  );
}
