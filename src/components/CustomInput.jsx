import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/actions/inputAction";

export default function CustomInput(props) {
  const [input, setInput] = useState("");
  const id = Date.now();
  const dispatch = useDispatch();

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  function handleButtonCreateTask(state) {
    dispatch(addTask(input, id));
  }

  return (
    <div>
      <input
        className="input"
        onChange={handleInputChange}
        placeholder="write a task"
      ></input>
      <button className="add_task_btn" onClick={handleButtonCreateTask}>
        Add
      </button>
    </div>
  );
}
