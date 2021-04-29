import React from "react";
import CustomInput from "./CustomInput";
import List from "./List";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";

export default function Board(props) {
  return (
    <div className="board">
      <List className="to_do" title="To do">
        <CustomInput></CustomInput>
      </List>
      <List className="in_process" title="In process"></List>
      <List className="done" title="Done"></List>
    </div>
  );
}
