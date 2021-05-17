import { SET_AUTORIZATION_STATUS_TRUE } from "../constants";

const initialState = false;

export default function autorizationReducer(
  state = initialState,
  action: { type: string; payload: boolean }
): boolean {
  switch (action.type) {
    case SET_AUTORIZATION_STATUS_TRUE: {
      return action.payload;
    }

    default:
      return state;
  }
}
