import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getData, {
  changeTaskColumnIdRequest,
  createColumnRequest,
  createTaskRequest,
  deleteColumnRequest,
  deleteTaskRequest,
} from "../../api";
import { SET_APP_DATA } from "../constants";

export const setAppDataAction = (data) => ({
  type: SET_APP_DATA,
  payload: data,
});

async function handleRequestSuccess(dispatch) {
  try {
    const data = await getData();
    dispatch(setAppDataAction(data));
  } catch (error) {
    toast.error(error.message);
  }
}

export const getAppDataAction = () => async (dispatch) => {
  handleRequestSuccess(dispatch);
};

export const createTaskAction = (title, columnId) => async (dispatch) => {
  try {
    await createTaskRequest(title, columnId);
    handleRequestSuccess(dispatch);
  } catch (error) {
    toast.error(error.message);
  }
};

export const deleteTaskAction = (id) => async (dispatch) => {
  try {
    await deleteTaskRequest(id);
    handleRequestSuccess(dispatch);
  } catch (error) {
    toast.error(error.message);
  }
};

export const updateTaskColumnIdAction = (taskId, columnId) => async (
  dispatch
) => {
  try {
    await changeTaskColumnIdRequest(taskId, columnId);
    handleRequestSuccess(dispatch);
  } catch (error) {
    toast.error(error.message);
  }
};

export const createColumnAction = (title) => async (dispatch) => {
  try {
    await createColumnRequest(title);
    handleRequestSuccess(dispatch);
  } catch (error) {
    toast.error(error.message);
  }
};

export const deleteColumnAction = (id) => async (dispatch) => {
  try {
    await deleteColumnRequest(id);
    await getData();
    handleRequestSuccess(dispatch);
  } catch (error) {
    toast.error(error.message);
  }
};
