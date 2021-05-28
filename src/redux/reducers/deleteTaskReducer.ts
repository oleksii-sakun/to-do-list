import { Task } from "../../components/Board";
import { ActionTypes } from "../constants";

const initialState: Task | null = null;
export default function deleteTaskReducer(
  state = initialState,
  action: { type: string; payload?: Task }
): Task | null {
  switch (action.type) {
    case ActionTypes.SET_TASK_TO_DELETE: {
      return action.payload || null;
    }
    case ActionTypes.RESET_TASK_TO_DELETE: {
      return null;
    }

    default:
      return state;
  }
}
