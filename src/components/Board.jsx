import React from "react";
import CustomInput from "./CustomInput";
import List from "./List";
import Card from "./Card";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, moveTaskToInProgress } from "../redux/actions/inputAction";

export default function Board(props) {
  const tasksToDo = useSelector(({ input: { tasksToDo } }) => tasksToDo);
  const dispatch = useDispatch();

  const handleDeleteTask = (task) => {
    dispatch(deleteTask(task));
  };
  const handleMoveTaskToInProgress = (task) => {
    dispatch(moveTaskToInProgress(task));
  };

  function renderTasksInList() {
    return tasksToDo.map((item) => {
      if (item.task) {
        return (
          <Card
            handleMoveTaskToInProgress={() => handleMoveTaskToInProgress(item)}
            handleDeleteTask={() => handleDeleteTask(item)}
            key={item.id}
            task={item.task}
          ></Card>
        );
      }
    });
  }

  return (
    <div className="board">
      <List className="to_do" title="To do">
        {renderTasksInList()}
        <CustomInput />
      </List>
      <List className="in_process" title="In progress"></List>
      <List className="done" title="Done"></List>
    </div>
  );
}
