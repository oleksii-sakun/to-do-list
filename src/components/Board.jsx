import React from "react";
import CustomInput from "./CustomInput";
import List from "./List";
import Card from "./Card";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";

export default function Board(props) {
  const tasksToDo = useSelector(({ input: { tasksToDo } }) => tasksToDo);

  function renderTasksInList() {
    return tasksToDo.map((task) => {
      if (task) {
        return <Card task={task}></Card>;
      }
    });
  }

  return (
    <div className="board">
      <List className="to_do" title="To do">
        {renderTasksInList()}
        <CustomInput></CustomInput>
      </List>
      <List className="in_process" title="In process"></List>
      <List className="done" title="Done"></List>
    </div>
  );
}
