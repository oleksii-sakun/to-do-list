import React, { useState } from "react";
import { createTaskRequest } from "../api";

export default function CustomInput(props) {
  const [inputValue, setInput] = useState("");

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  const handleActionForAddTaskButton = (value, column) => {
    if (value) {
      createTaskRequest(value, column).then(props.getDataFunction);
    }
  };

  return (
    <div>
      <input
        className="input"
        onChange={handleInputChange}
        placeholder="write a task"
      ></input>
      <button
        className="add_task_btn"
        onClick={() =>
          handleActionForAddTaskButton(inputValue, Number(props.column))
        }
      >
        Add
      </button>
    </div>
  );
}
