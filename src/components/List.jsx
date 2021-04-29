import React from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";

export default function List(props) {
  const tasksToDo = useSelector(({ input: { tasksToDo } }) => tasksToDo);

  function renderTasksInList() {
    return tasksToDo.map((task) => {
      if (task) {
        return <Card task={task}></Card>;
      }
    });
  }

  return (
    <div className="list_item">
      <h1>{props.title}</h1>
      {renderTasksInList()}
      {props.children}
    </div>
  );
}
