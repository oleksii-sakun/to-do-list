import React from "react";
import CustomInput from "./CustomInput";
import List from "./List";
import Card from "./Card";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  moveTaskInToDo,
  moveTaskToInProgress,
  moveTaskToDone,
  moveTaskToInProgressFromDone,
  deleteTaskFromDone,
} from "../redux/actions/inputAction";

export default function Board(props) {
  const tasksToDo = useSelector(({ input: { tasksToDo } }) => tasksToDo);
  const tasksInProgress = useSelector(
    ({ input: { tasksInProgress } }) => tasksInProgress
  );
  const tasksDone = useSelector(({ input: { tasksDone } }) => tasksDone);

  const dispatch = useDispatch();

  const handleDeleteTask = (task) => {
    dispatch(deleteTask(task));
  };
  const handleMoveTaskToInProgress = (task) => {
    dispatch(moveTaskToInProgress(task));
  };

  const handleMoveTaskInToDo = (task) => {
    dispatch(moveTaskInToDo(task));
  };

  const handleMoveTaskToDone = (task) => {
    dispatch(moveTaskToDone(task));
  };

  const handleMoveTaskToInProgressFromDone = (task) => {
    dispatch(moveTaskToInProgressFromDone(task));
  };

  const handleDeleteTaskFromDone = (task) => {
    dispatch(deleteTaskFromDone(task));
  };

  function renderTasksInList() {
    return tasksToDo.map((item) => {
      if (item.task) {
        return (
          <Card
            handleActionForLeftButtton={() => handleMoveTaskToInProgress(item)}
            handleActionForRightButton={() => handleDeleteTask(item)}
            key={item.id}
            task={item.task}
            textForTheLeftButton="in progress"
            textForTheRightButton="X"
          ></Card>
        );
      }
    });
  }

  function renderTasksInProgressList() {
    return tasksInProgress.map((item) => {
      return (
        <Card
          handleActionForLeftButtton={() => handleMoveTaskInToDo(item)}
          handleActionForRightButton={() => handleMoveTaskToDone(item)}
          key={item.id}
          task={item.task}
          textForTheLeftButton="to do"
          textForTheRightButton="done"
        ></Card>
      );
    });
  }

  function renderTasksInDoneList() {
    return tasksDone.map((item) => {
      return (
        <Card
          handleActionForLeftButtton={() =>
            handleMoveTaskToInProgressFromDone(item)
          }
          handleActionForRightButton={() => handleDeleteTaskFromDone(item)}
          key={item.id}
          task={item.task}
          textForTheLeftButton="in progress"
          textForTheRightButton="X"
        ></Card>
      );
    });
  }

  return (
    <div className="board">
      <List className="to_do" title="To do">
        {renderTasksInList()}
        <CustomInput />
      </List>
      <List className="in_process" title="In progress">
        {renderTasksInProgressList()}
      </List>
      <List className="done" title="Done">
        {renderTasksInDoneList()}
      </List>
    </div>
  );
}
