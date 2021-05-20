import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { loginCheckRequest, singInRequest, singUpRequest } from "../../api";
import { ActionTypes } from "../constants";
import { handleRequestSuccess } from "./inputAction";

interface SetAutorizationStatusAction {
  type: string;
  payload: boolean;
}

export const setAutorizationStatusAction = (): SetAutorizationStatusAction => ({
  type: ActionTypes.SET_AUTORIZATION_STATUS,
  payload: true,
});

export const singUpAction =
  (login: string, password: string) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      await singUpRequest(login, password);
      handleRequestSuccess(dispatch);
    } catch (error) {
      toast.error(error.message);
    }
  };

export const singInAction =
  (login: string, password: string) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      await singInRequest(login, password);
      handleRequestSuccess(dispatch);
    } catch (error) {
      toast.error(error.message);
    }
  };

export const loginCheckAction =
  (login: string) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      await loginCheckRequest(login);
      handleRequestSuccess(dispatch);
    } catch (error) {
      toast.error(error.message);
    }
  };
