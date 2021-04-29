import React from "react";

export default function Card(props) {
  return (
    <div className="card">
      <input type="checkbox" />
      {props.task}
      <a href="#" className="checklist_task-remove" />
    </div>
  );
}
