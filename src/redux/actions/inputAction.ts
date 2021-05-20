import { Dispatch } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getData, {
  addTaskDeadlineRequest,
  changeTaskColorRequest,
  changeTaskColumnIdRequest,
  createColumnRequest,
  createTaskRequest,
  deleteColumnRequest,
  deleteTaskRequest,
  editTaskTitleRequest,
} from "../../api";
import { Column } from "../../components/Board";
import { ActionTypes } from "../constants";
import { Moment } from "moment";

interface SetAppDataAction {
  type: string;
  payload: Column[];
}

export const setAppDataAction = (payload: Column[]): SetAppDataAction => ({
  type: ActionTypes.SET_APP_DATA,
  payload,
});

export async function handleRequestSuccess(
  dispatch: Dispatch<unknown>
): Promise<void> {
  try {
    const data = await getData();
    dispatch(setAppDataAction(data));
  } catch (error) {
    toast.error(error.message);
  }
}

export const getAppDataAction =
  () =>
  async (dispatch: Dispatch<unknown>): Promise<void> => {
    handleRequestSuccess(dispatch);
  };

export const createTaskAction =
  (title: string, columnId: number) =>
  async (dispatch: Dispatch<unknown>): Promise<void> => {
    try {
      await createTaskRequest(title, columnId);
      handleRequestSuccess(dispatch);
    } catch (error) {
      toast.error(error.message);
    }
  };

export const deleteTaskAction =
  (id: number) =>
  async (dispatch: Dispatch<unknown>): Promise<void> => {
    try {
      await deleteTaskRequest(id);
      handleRequestSuccess(dispatch);
    } catch (error) {
      toast.error(error.message);
    }
  };

export const updateTaskColumnIdAction =
  (taskId: number, columnId: number) =>
  async (dispatch: Dispatch<unknown>): Promise<void> => {
    try {
      await changeTaskColumnIdRequest(taskId, columnId);
      handleRequestSuccess(dispatch);
    } catch (error) {
      toast.error(error.message);
    }
  };

export const editTaskTitleAction =
  (taskId: number, title: string) =>
  async (dispatch: Dispatch<unknown>): Promise<void> => {
    try {
      await editTaskTitleRequest(taskId, title);
      handleRequestSuccess(dispatch);
    } catch (error) {
      toast.error(error.message);
    }
  };

export const addTaskDedalineAction =
  (taskId: number, date: string) =>
  async (dispatch: Dispatch<unknown>): Promise<void> => {
    try {
      await addTaskDeadlineRequest(taskId, date);
      handleRequestSuccess(dispatch);
    } catch (error) {
      toast.error(error.message);
    }
  };

export const createColumnAction =
  (title: string) =>
  async (dispatch: Dispatch<unknown>): Promise<void> => {
    try {
      await createColumnRequest(title);
      handleRequestSuccess(dispatch);
    } catch (error) {
      toast.error(error.message);
    }
  };

export const deleteColumnAction =
  (id: number) =>
  async (dispatch: Dispatch<unknown>): Promise<void> => {
    try {
      await deleteColumnRequest(id);
      handleRequestSuccess(dispatch);
    } catch (error) {
      toast.error(error.message);
    }
  };

export const changeTaskColorAction =
  (id: number, color: string) =>
  async (dispatch: Dispatch<unknown>): Promise<void> => {
    try {
      await changeTaskColorRequest(id, color);
      handleRequestSuccess(dispatch);
    } catch (error) {
      toast.error(error.message);
    }
  };
