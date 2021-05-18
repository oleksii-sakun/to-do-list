import { Dispatch } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getData, {
  changeTaskColorRequest,
  changeTaskColumnIdRequest,
  createColumnRequest,
  createTaskRequest,
  deleteColumnRequest,
  deleteTaskRequest,
  singInRequest,
  singUpRequest,
} from "../../api";
import { Column } from "../../components/Board";
import { ActionTypes } from "../constants";

interface SetAppDataAction {
  type: string;
  payload: Column[];
}

interface SetAutorizationStatusAction {
  type: string;
  payload: boolean;
}

export const setAppDataAction = (payload: Column[]): SetAppDataAction => ({
  type: ActionTypes.SET_APP_DATA,
  payload,
});

export const setAutorizationStatusAction = (): SetAutorizationStatusAction => ({
  type: ActionTypes.SET_AUTORIZATION_STATUS,
  payload: true,
});

async function handleRequestSuccess(dispatch: Dispatch<unknown>) {
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

export const singUpAction =
  (login: string, password: string) =>
  async (dispatch: Dispatch<unknown>): Promise<void> => {
    await singUpRequest(login, password);
    handleRequestSuccess(dispatch);
  };

export const singInAction =
  (login: string) =>
  async (dispatch: Dispatch<unknown>): Promise<void> => {
    await singInRequest(login);
    handleRequestSuccess(dispatch);
  };
