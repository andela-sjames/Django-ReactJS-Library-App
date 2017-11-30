export interface IState {
  auth: {
    isAuthenticated?: boolean,
    email?: string,
    error?: string,
  },
}

export type Dispatch = (action: IAction) => void;
export type ThunkDispatch = (actionCreator: Function) => void;

export interface IAction {
  type: string,
  payload?: {
    auth?: IState.auth,
    email?: string,
  },
}
