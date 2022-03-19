import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import { Action } from "../actions";
import { Photo } from "pexels";

export const addPhoto = (photo: Photo) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADDED,
      payload: {
        photo,
      },
    });
  };
};

export const removePhoto = (id: Photo["id"]) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REMOVED,
      payload: {
        id: id,
      },
    });
  };
};
