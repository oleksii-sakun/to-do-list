import { Column } from "../../components/Board";
import { ActionTypes } from "../constants";

const initialState: Column[] = [];

export default function inputReducer(
  state: Column[] = initialState,
  action: { type: string; payload: Column[] }
): Column[] {
  switch (action.type) {
    case ActionTypes.SET_APP_DATA: {
      return action.payload;
    }

    default:
      return state;
  }
}
