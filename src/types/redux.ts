export interface IAction<Payload> {
  type: string;
  payload: Payload;
  error?: boolean;
}

export interface IRootState {
  todos: ITodoStoreState;
}
