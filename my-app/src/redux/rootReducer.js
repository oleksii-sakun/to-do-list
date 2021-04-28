import { combineReducers } from "redux";
import inputReducer from "./reducers/inputReducer";

export default combineReducers({
  input: inputReducer,
});
