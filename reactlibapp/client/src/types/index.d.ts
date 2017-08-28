export type State = {
  auth: {
    isAuthenticated?: boolean,
  },
};

export type Dispatch = (action: Action) => void;
export type ThunkDispatch = (actionCreator: Function) => void;

export type Action = {
  type: string,
  payload?: object,
};
