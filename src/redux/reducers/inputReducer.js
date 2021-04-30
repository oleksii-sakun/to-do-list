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
        tasksToDo: addTaskToList(state.tasksToDo, action.payload),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasksToDo: filterList(state.tasksToDo, action.payload.id),
      };
    case MOVE_TASK_TO_IN_PROGRESS:
      return {
        ...state,
        tasksToDo: filterList(state.tasksToDo, action.payload.id),
        tasksInProgress: addTaskToList(state.tasksInProgress, action.payload),
      };

    case MOVE_TASK_IN_TO_DO:
      return {
        ...state,
        tasksInProgress: filterList(state.tasksInProgress, action.payload.id),
        tasksToDo: addTaskToList(state.tasksToDo, action.payload),
      };

    case MOVE_TASK_TO_DONE:
      return {
        ...state,
        tasksInProgress: filterList(state.tasksInProgress, action.payload.id),
        tasksDone: addTaskToList(state.tasksDone, action.payload),
      };

    case MOVE_TASK_TO_IN_PROGRESS_FROM_DONE:
      return {
        ...state,
        tasksDone: filterList(state.tasksDone, action.payload.id),
        tasksInProgress: addTaskToList(state.tasksInProgress, action.payload),
      };

    case DELETE_TASK_FROM_DONE:
      return {
        ...state,
        tasksDone: filterList(state.tasksDone, action.payload.id),
      };
    default:
      return state;
  }
}

function filterList(list, taskId) {
  return list.filter((task) => task.id !== taskId);
}

function addTaskToList(list, task) {
  return list.concat([task]);
}
