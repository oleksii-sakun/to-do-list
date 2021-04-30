import {
  CREATE_TASK,
  DELETE_TASK,
  MOVE_TASK_TO_IN_PROGRESS,
  MOVE_TASK_IN_TO_DO,
  MOVE_TASK_TO_DONE,
  MOVE_TASK_TO_IN_PROGRESS_FROM_DONE,
  DELETE_TASK_FROM_DONE,
} from "../constants";

export const addTask = (task, id) => ({
  type: CREATE_TASK,
  payload: { task, id },
});

export const deleteTask = (task) => ({
  type: DELETE_TASK,
  payload: task,
});

export const moveTaskToInProgress = (task) => ({
  type: MOVE_TASK_TO_IN_PROGRESS,
  payload: task,
});

export const moveTaskInToDo = (task) => ({
  type: MOVE_TASK_IN_TO_DO,
  payload: task,
});

export const moveTaskToDone = (task) => ({
  type: MOVE_TASK_TO_DONE,
  payload: task,
});

export const moveTaskToInProgressFromDone = (task) => ({
  type: MOVE_TASK_TO_IN_PROGRESS_FROM_DONE,
  payload: task,
});

export const deleteTaskFromDone = (task) => ({
  type: DELETE_TASK_FROM_DONE,
  payload: task,
});
