import { combineReducers } from "redux";
import { checkUser } from "./authReducer";
import { checkNetworkStatus } from "./networkReducer";

export default combineReducers({
  checkUser,
  checkNetworkStatus
});
