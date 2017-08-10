interface BaseAction {
  type: string
}

export interface PersistAction extends BaseAction {
  payload: object
}
