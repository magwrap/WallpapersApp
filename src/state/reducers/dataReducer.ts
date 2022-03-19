import { Photos } from "pexels";
import { ActionType } from "../action-types";
import { Action } from "../actions";

type FavouritesState = Photos | [];

const initialState: FavouritesState = [];

const favouritesReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.ADDED:
      return [
        ...state,
        action.payload.photo,
        
      ];
    case ActionType.REMOVED:
      return state.filter(
        (photo: { id: number }) => photo.id !== action.payload.id,
      );
    default:
      return state;
  }
};

export default favouritesReducer;
