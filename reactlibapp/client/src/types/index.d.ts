export interface State {
  auth: {
    isAuthenticated?: boolean,
    email: string,
  },
};

export type Dispatch = (action: Action) => void;
export type ThunkDispatch = (actionCreator: Function) => void;

export interface Action {
  type: string,
  payload?: {
    auth?: object,
  },
};
