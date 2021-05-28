import { combineReducers } from "redux";
import authorizationReducer from "./reducers/authorizationReducer";
import deleteTaskReducer from "./reducers/deleteTaskReducer";
import editTaskReducer from "./reducers/editTaskReducer";
import app from "./reducers/boardReducer";

export default combineReducers({
  app,
  authorization: authorizationReducer,
  taskToDelete: deleteTaskReducer,
  taskToEdit: editTaskReducer,
});
