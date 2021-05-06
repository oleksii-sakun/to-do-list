import React, { useState } from "react";
import { Button, Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export default function CreateTaskInput(props) {
  const [inputValue, setInput] = useState("");

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  const handleActionForAddTaskButton = (value, column) => {
    if (inputValue) {
      props.onAddTask(inputValue);
      setInput("");
    }
  };

  return (
    <div>
      <Input
        className="add_task_input"
        onChange={handleInputChange}
        placeholder="write a task"
        value={inputValue}
      ></Input>
      <Button
        positive
        className="add_task_btn"
        onClick={() => handleActionForAddTaskButton(inputValue, props.column)}
      >
        Add task
      </Button>
    </div>
  );
}
