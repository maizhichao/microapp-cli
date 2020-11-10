import { combineReducers } from "redux";

export const initialState = {
  data: {}
};

function main(state = initialState, action) {
  return state;
}

export default combineReducers({
  main
});
