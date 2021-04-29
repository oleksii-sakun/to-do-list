import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/actions/inputAction";

export default function CustomInput(props) {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  function handleButtonCreateTask(state) {
    dispatch(addTask(input));
  }

  return (
    <div>
      <input
        className="input"
        onChange={handleInputChange}
        placeholder="write a task"
      ></input>
      <button className="btn" onClick={handleButtonCreateTask}>
        Add
      </button>
    </div>
  );
}
