import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import { combineReducers } from "redux";
const AllReducer = combineReducers({
    LoginReducer,UserReducer
});
export default AllReducer;