import { Column } from "../../components/Board";
import { SET_APP_DATA } from "../constants";

const initialState: Column[] = [];

export default function inputReducer(
  state: Column[] = initialState,
  action: { type: string; payload: Column[] }
): Column[] {
  switch (action.type) {
    case SET_APP_DATA: {
      return action.payload;
    }

    default:
      return state;
  }
}
