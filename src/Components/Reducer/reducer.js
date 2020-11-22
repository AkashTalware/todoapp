import { combineReducers } from "redux";
import authReducer from "./authReducer";
import toDoArrayReducer from "./toDoArrayReducer";
import navReducer from "./navReducer";

export default combineReducers({
  todoArray: toDoArrayReducer,
  authDetails: authReducer,
  navItem: navReducer
});
