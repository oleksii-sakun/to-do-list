import { SET_APP_DATA } from "../constants";

const initialState = [];

export default function inputReducer(state = initialState, action) {
  switch (action.type) {
    case SET_APP_DATA: {
      return action.payload;
    }

    default:
      return state;
  }
}
