import { moveTaskToInProgressFromDone } from "../actions/inputAction";
import {
  CREATE_TASK,
  DELETE_TASK,
  MOVE_TASK_TO_IN_PROGRESS,
  MOVE_TASK_IN_TO_DO,
  MOVE_TASK_TO_DONE,
  MOVE_TASK_TO_IN_PROGRESS_FROM_DONE,
  DELETE_TASK_FROM_DONE,
} from "../constants";

const initialState = {
  tasksInProgress: [],
  tasksToDo: [],
  tasksDone: [],
};

export default function inputReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TASK:
      return {
        ...state,
        tasksToDo: state.tasksToDo.concat([action.payload]),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasksToDo: state.tasksToDo.filter(
          (task) => task.id !== action.payload.id
        ),
      };
    case MOVE_TASK_TO_IN_PROGRESS:
      return {
        ...state,
        tasksToDo: state.tasksToDo.filter(
          (task) => task.id !== action.payload.id
        ),
        tasksInProgress: state.tasksInProgress.concat([action.payload]),
      };

    case MOVE_TASK_IN_TO_DO:
      return {
        ...state,
        tasksInProgress: state.tasksInProgress.filter(
          (task) => task.id !== action.payload.id
        ),
        tasksToDo: state.tasksToDo.concat([action.payload]),
      };

    case MOVE_TASK_TO_DONE:
      return {
        ...state,
        tasksInProgress: state.tasksInProgress.filter(
          (task) => task.id !== action.payload.id
        ),
        tasksDone: state.tasksDone.concat([action.payload]),
      };

    case MOVE_TASK_TO_IN_PROGRESS_FROM_DONE:
      return {
        ...state,
        tasksDone: state.tasksDone.filter(
          (task) => task.id !== action.payload.id
        ),
        tasksInProgress: state.tasksInProgress.concat([action.payload]),
      };

    case DELETE_TASK_FROM_DONE:
      return {
        ...state,
        tasksDone: state.tasksDone.filter(
          (task) => task.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
}
