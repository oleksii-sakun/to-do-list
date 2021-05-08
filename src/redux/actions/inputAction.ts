import { Dispatch } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getData, {
  changeTaskColumnIdRequest,
  createColumnRequest,
  createTaskRequest,
  deleteColumnRequest,
  deleteTaskRequest,
} from "../../api";
import { Column } from "../../components/Board";
import { SET_APP_DATA } from "../constants";

export const setAppDataAction = (data: Column[]) => ({
  type: SET_APP_DATA,
  payload: data,
});

async function handleRequestSuccess(dispatch: Dispatch<any>) {
  try {
    const data = await getData();
    dispatch(setAppDataAction(data));
  } catch (error) {
    toast.error(error.message);
  }
}

export const getAppDataAction = () => async (dispatch: Dispatch<any>) => {
  handleRequestSuccess(dispatch);
};

export const createTaskAction = (title: string, columnId: number) => async (
  dispatch: Dispatch<any>
) => {
  try {
    await createTaskRequest(title, columnId);
    handleRequestSuccess(dispatch);
  } catch (error) {
    toast.error(error.message);
  }
};

export const deleteTaskAction = (id: number) => async (
  dispatch: Dispatch<any>
) => {
  try {
    await deleteTaskRequest(id);
    handleRequestSuccess(dispatch);
  } catch (error) {
    toast.error(error.message);
  }
};

export const updateTaskColumnIdAction = (
  taskId: number,
  columnId: number
) => async (dispatch: Dispatch<any>) => {
  try {
    await changeTaskColumnIdRequest(taskId, columnId);
    handleRequestSuccess(dispatch);
  } catch (error) {
    toast.error(error.message);
  }
};

export const createColumnAction = (title: string) => async (
  dispatch: Dispatch<any>
) => {
  try {
    await createColumnRequest(title);
    handleRequestSuccess(dispatch);
  } catch (error) {
    toast.error(error.message);
  }
};

export const deleteColumnAction = (id: number) => async (
  dispatch: Dispatch<any>
) => {
  try {
    await deleteColumnRequest(id);
    await getData();
    handleRequestSuccess(dispatch);
  } catch (error) {
    toast.error(error.message);
  }
};
