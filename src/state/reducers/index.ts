import { combineReducers } from "redux";
import dataReducer from "./dataReducer";

const reducers = combineReducers({
  data: dataReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
