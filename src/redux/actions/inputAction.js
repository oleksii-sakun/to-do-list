import { CREATE_TASK } from "../constants";

export const addTask = (task) => ({
  type: CREATE_TASK,
  payload: task,
});
