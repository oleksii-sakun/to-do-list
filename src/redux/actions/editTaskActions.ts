import { Task } from "../../components/Board";
import { ActionTypes } from "../constants";

interface setTaskToEditActionInterface {
  type: string;
  payload: Task;
}

export const setTaskToEditAction = (
  task: Task
): setTaskToEditActionInterface => ({
  type: ActionTypes.SET_TASK_TO_EDIT,
  payload: task,
});

export const resetTaskToEditAction = (): { type: ActionTypes } => ({
  type: ActionTypes.RESET_TASK_TO_EDIT,
});
