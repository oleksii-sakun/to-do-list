import { CREATE_TASK, DELETE_TASK } from "../constants";

const initialState = {
  tasksToDo: [],
};

export default function inputReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TASK:
      return {
        ...state.tasksToDo,
        tasksToDo: state.tasksToDo.concat([action.payload]),
      };
    case DELETE_TASK:
      return {
        ...state.tasksToDo,
        tasksToDo: state.tasksToDo.filter(
          (task) => task.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
}
