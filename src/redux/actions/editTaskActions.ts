import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { updateTaskRequest } from "../../api";
import { Task } from "../../components/Board";
import { ActionTypes } from "../constants";
import { getAppDataAction, handleRequestSuccess } from "./inputAction";

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

export const updateTaskAction =
  (id: number, title: string, color: string, date: string, columnId: number) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      await updateTaskRequest(id, title, color, date, columnId);
      handleRequestSuccess(dispatch);
      dispatch(getAppDataAction());
      dispatch(resetTaskToEditAction());
    } catch (error) {
      toast.error(error.message);
    }
  };
