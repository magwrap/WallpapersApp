import { combineReducers } from "redux";
import favouritesReducer from "./dataReducer";

const reducers = combineReducers({
  data: favouritesReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
