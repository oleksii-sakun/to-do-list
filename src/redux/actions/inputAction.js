import getData, { changeTaskColumnIdRequest, createColumnRequest, createTaskRequest, deleteColumnRequest, deleteTaskRequest } from "../../api";
import { SET_APP_DATA } from "../constants";

export const setAppDataAction = (data) => ({
  type: SET_APP_DATA,
  payload: data,
});


export const getAppDataAction = () => (dispatch) => (
  getData()
    .then((data) => dispatch(setAppDataAction(data)))
)

export const createColumnAction = (name) => (dispatch) => (
  createColumnRequest(name)
    .then(getData)
    .then((data) => dispatch(setAppDataAction(data)))
)

export const deleteColumnAction = (id) => (dispatch) => (
  deleteColumnRequest(id)
    .then(getData)
    .then((data) => dispatch(setAppDataAction(data)))
)

export const createTaskAction = (title, columnId) => (dispatch) => (
  createTaskRequest(title, columnId)
    .then(getData)
    .then((data) => dispatch(setAppDataAction(data)))
)

export const deleteTaskAction = (id) => (dispatch) => (
  deleteTaskRequest(id)
    .then(getData)
    .then((data) => dispatch(setAppDataAction(data)))
)

export const updateTaskColumnIdAction = (taskId, columnId) => (dispatch) => (
  changeTaskColumnIdRequest(taskId, columnId)
    .then(getData)
    .then((data) => dispatch(setAppDataAction(data)))
)
