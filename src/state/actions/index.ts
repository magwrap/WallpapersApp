import { Photo } from "pexels";
import { ActionType } from "../action-types";

interface AddedAction {
  type: ActionType.ADDED;
  payload: {
      photo:Photo, 
  }
}

interface RemovedAction {
  type: ActionType.REMOVED;
  payload: {
      id : Photo["id"]
    };
}

export type Action = AddedAction | RemovedAction;
