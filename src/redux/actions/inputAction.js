import {
  CREATE_TASK,
  DELETE_TASK,
  MOVE_TASK_TO_IN_PROGRESS,
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
