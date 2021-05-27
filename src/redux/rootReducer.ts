import { combineReducers } from "redux";
import autorizationReducer from "./reducers/autorizationReducer";
import deleteTaskReducer from "./reducers/deleteTaskReducer";
import editTaskReducer from "./reducers/editTaskReducer";
import app from "./reducers/boardReducer";

export default combineReducers({
  app,
  authorization: autorizationReducer,
  taskToDelete: deleteTaskReducer,
  taskToEdit: editTaskReducer,
});
