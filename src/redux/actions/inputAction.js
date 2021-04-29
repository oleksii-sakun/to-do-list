import { CREATE_TASK, DELETE_TASK } from "../constants";

export const addTask = (task, id) => ({
  type: CREATE_TASK,
  payload: { task, id },
});

export const deleteTask = (task) => ({
  type: DELETE_TASK,
  payload: task,
});
