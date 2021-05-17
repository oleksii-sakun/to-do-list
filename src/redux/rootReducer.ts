import { combineReducers } from "redux";
import autorizationReducer from "./reducers/autorizationReducer";
import app from "./reducers/inputReducer";

export default combineReducers({
  app,
  autorization: autorizationReducer,
});
