import { CREATE_TASK, DELETE_TASK } from "../constants";

export const addTask = (task) => ({
  type: CREATE_TASK,
  payload: task,
});

export const deleteTask = (task) => ({
  type: DELETE_TASK,
  payload: task,
});
