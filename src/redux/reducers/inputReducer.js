import { CREATE_TASK } from "../constants";

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

    default:
      return state;
  }
}
