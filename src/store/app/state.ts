export interface IAppState {
  modalShowing: number
}

// Refer to: https://github.com/Microsoft/TypeScript/issues/15300
// tslint:disable-next-line:interface-over-type-literal
export type IAppGetters = {
  shouldMaskShow(s: IAppState): boolean,
}

export const state: IAppState = {
  modalShowing: 0,
}

export const getters: IAppGetters = {
  shouldMaskShow(s: IAppState): boolean {
    return s.modalShowing > 0
  },
}
