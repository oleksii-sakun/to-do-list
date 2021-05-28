import { Dispatch } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getData, {
  createColumnRequest,
  createTaskRequest,
  deleteColumnRequest,
  deleteTaskRequest,
  editColumnTitleRequest,
} from "../../api";
import { Column } from "../../components/Board";
import { ActionTypes } from "../constants";
import { resetTaskToDeleteAction } from "./deletionActions";

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
    const userId = localStorage.getItem("userId") as string;
    const data = await getData(userId);
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
  (createTaskActionArguments: {
    title: string;
    color: string;
    date: string;
    columnId: number;
  }) =>
  async (dispatch: Dispatch<unknown>): Promise<void> => {
    try {
      await createTaskRequest(
        createTaskActionArguments.title,
        createTaskActionArguments.color,
        createTaskActionArguments.date,
        createTaskActionArguments.columnId
      );
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
      dispatch(resetTaskToDeleteAction());
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

export const editColumnTitleAction =
  (id: number, title: string) =>
  async (dispatch: Dispatch<unknown>): Promise<void> => {
    try {
      await editColumnTitleRequest(id, title);
      handleRequestSuccess(dispatch);
    } catch (error) {
      toast.error(error.message);
    }
  };
