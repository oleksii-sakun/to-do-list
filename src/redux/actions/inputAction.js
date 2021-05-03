import { SET_APP_DATA } from "../constants";

export const setAppDataAction = (data) => ({
  type: SET_APP_DATA,
  payload: data,
});
