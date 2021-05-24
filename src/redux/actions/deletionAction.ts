import { Task } from "../../components/Board";
import { ActionTypes } from "../constants";

interface setTaskToDeleteActionInterface {
  type: string;
  payload: Task;
}

export const setTaskToDeleteAction = (
  task: Task
): setTaskToDeleteActionInterface => ({
  type: ActionTypes.SET_TASK_TO_DELETE,
  payload: task,
});

export const resetTaskToDeleteAction = () => ({
  type: ActionTypes.RESET_TASK_TO_DELETE,
});
