import { combineReducers } from "redux";
import autorizationReducer from "./reducers/autorizationReducer";
import deleteTaskReducer from "./reducers/deleteTaskReducer";
import app from "./reducers/inputReducer";

export default combineReducers({
  app,
  autorization: autorizationReducer,
  taskToDelete: deleteTaskReducer,
});
