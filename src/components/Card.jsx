import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Card(props) {
  const dispatch = useDispatch();

  function handleDeleteTask(event) {
    console.log(event);
  }

  return (
    <div className="card">
      <input type="checkbox" />
      {props.task}
      <a
        onClick={handleDeleteTask}
        href="#"
        className="checklist_task-remove"
      />
    </div>
  );
}
