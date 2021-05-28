import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { loginCheckRequest, singInRequest, singUpRequest } from "../../api";
import { handleRequestSuccess } from "./boardActions";

import { ActionTypes } from "../constants";
interface SetauthorizationStatusAction {
  type: string;
  payload: boolean;
}

export const setauthorizationStatusAction = (
  payload: boolean
): SetauthorizationStatusAction => ({
  type: ActionTypes.SET_AUTHORIZATION_STATUS,
  payload,
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
  (login: string, password: string, toggleLoader?: (arg: boolean) => void) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      if (toggleLoader) {
        toggleLoader(true);
      }
      const userData = await singInRequest(login, password);

      if (userData.data.length) {
        localStorage.setItem("login", login);
        localStorage.setItem("password", password);
        localStorage.setItem("userId", userData.data[0].id.toString());
        handleRequestSuccess(dispatch);
        dispatch(setauthorizationStatusAction(true));
        if (toggleLoader) {
          toggleLoader(false);
        }
      } else {
        toast.error("Your login or password is not correct");
      }
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
