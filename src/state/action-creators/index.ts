import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import { Action } from "../actions";

export const addState = (description: string) => {
  description = "descripiton";
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADDED,
      payload: {
        description: description,
      },
    });
  };
};

export const removeState = (id: number) => {
  id = 1;
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REMOVED,
      payload: {
        id: id,
      },
    });
  };
};
