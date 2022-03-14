import { ActionType } from "../action-types";
import { Action } from "../actions";

type DataState = [];

const initialState: DataState = [];

let lastId = 0;

const dataReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.ADDED:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];
    case ActionType.REMOVED:
      return state.filter(
        (oneData: { id: number }) => oneData.id !== action.payload.id
      );
    default:
      return state;
  }
};

export default dataReducer;
