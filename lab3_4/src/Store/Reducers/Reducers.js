import { combineReducers } from "redux";
import usersReducer from "./UsersReducer.js";

export default combineReducers({
    users:usersReducer
})