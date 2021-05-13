import React, { useState } from "react";
import { Button, Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

interface CreateTaskInputProps {
  onAddTask: (inputValue: string) => void;
}

export default function CreateTaskInput(
  props: CreateTaskInputProps
): JSX.Element {
  const [inputValue, setInput] = useState("");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  const handleActionForAddTaskButton = () => {
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
        onClick={() => handleActionForAddTaskButton()}
      >
        Add task
      </Button>
    </div>
  );
}
