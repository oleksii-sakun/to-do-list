import { ActionTypes } from "../constants";

const initialState = false;

export default function autorizationReducer(
  state = initialState,
  action: { type: string; payload: boolean }
): boolean {
  switch (action.type) {
    case ActionTypes.SET_AUTORIZATION_STATUS: {
      return action.payload;
    }

    default:
      return state;
  }
}
