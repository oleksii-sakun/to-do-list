import { combineReducers } from "redux";
import autorizationReducer from "./reducers/autorizationReducer";
import deleteTaskReducer from "./reducers/deleteTaskReducer";
import editTaskReducer from "./reducers/editTaskReducer";
import app from "./reducers/boardReducer";

export default combineReducers({
  app,
  autorization: autorizationReducer,
  taskToDelete: deleteTaskReducer,
  taskToEdit: editTaskReducer,
});
