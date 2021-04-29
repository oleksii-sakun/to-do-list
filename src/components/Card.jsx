import React from "react";

export default function Card(props) {
  return (
    <div className="card">
      <input type="checkbox" onChange={props.handleMoveTaskToInProgress} />
      {props.task}
      <button
        onClick={props.handleDeleteTask}
        className="checklist_task-remove"
      />
    </div>
  );
}
