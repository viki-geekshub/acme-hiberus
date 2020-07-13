import { combineReducers } from "redux";
import user from "./user";
import movie from "./movie";

const reducer = combineReducers({
    user,
    movie
})
export default reducer;