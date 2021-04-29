import {
  CREATE_TASK,
  DELETE_TASK,
  MOVE_TASK_TO_IN_PROGRESS,
} from "../constants";

const initialState = {
  tasksInProgress: [],
  tasksToDo: [],
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
    default:
      return state;
  }
}
