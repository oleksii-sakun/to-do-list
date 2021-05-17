import { SET_AUTORIZATION_STATUS_TRUE } from "../constants";

interface SetAutorizationStatusAction {
  type: string;
  payload: boolean;
}

export const setAutorizationStatusAction = (): SetAutorizationStatusAction => ({
  type: SET_AUTORIZATION_STATUS_TRUE,
  payload: true,
});
