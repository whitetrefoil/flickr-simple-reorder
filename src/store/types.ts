import { ActionType, PayloadAction, PayloadActionCreator } from 'typesafe-actions';


declare global {
  type RootAction =
    |ActionType<typeof import('./session/actions')>
    ;

  interface RootState {
    session: import('./session/reducer').State;
  }

  export type PA<T> = PayloadAction<string, T>;
  export type PAC<T> = PayloadActionCreator<string, T>;
}
// export type AnyA<R = any> = RootAction|ThunkA<R>;
// export type AnyAC<R = any> = ThunkAC<R>|((...args: any[]) => RootAction);

// export type ThunkD = ThunkDispatch<RootState, void, RootAction>;


declare module 'typesafe-actions' {
  interface Types {
    RootAction: RootAction;
  }

  export type NoMeta<T> = [T, never];
}
