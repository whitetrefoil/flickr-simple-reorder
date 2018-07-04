import { GetterTree }  from 'vuex'
import { IRootState }  from '../state'
import { IModalState } from './state'


export const getters: GetterTree<IModalState, IRootState> = {
  shouldMaskShow(state): boolean {
    return state.modalShowing > 0
  },
}
