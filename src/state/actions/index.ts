import { ActionType } from "../action-types";

interface AddedAction {
  type: ActionType.ADDED;
  payload: {
    description: string;
  };
}

interface RemovedAction {
  type: ActionType.REMOVED;
  payload: {
    id: number;
  };
}

// type Action = {
//   type: string;
//   payload?: any;
// };

export type Action = AddedAction | RemovedAction;
