import { getLogger }             from '@whitetrefoil/debug-log'
import { MutationTree, Payload } from 'vuex'
import * as t                    from '../types'
import { IModalState }           from './state'


interface IOneMoreModalPayload extends Payload {
  type: typeof t.MODAL__ONE_MORE_MODAL
}

interface IOneLessModalPayload extends Payload {
  type: typeof t.MODAL__ONE_MORE_MODAL
}

export type IModalCommitPayload =
  |IOneMoreModalPayload
  |IOneLessModalPayload


const { debug } = getLogger(`/src/${__filename.split('?')[0]}`)


export const mutations: MutationTree<IModalState> = {
  [t.MODAL__ONE_MORE_MODAL](state) {
    debug('One more modal!')
    state.modalShowing += 1
    debug(`${state.modalShowing} modal(s) is showing.`)
  },

  [t.MODAL__ONE_LESS_MODAL](state) {
    debug('One more modal!')
    if (state.modalShowing <= 0) {
      debug('Warning! Attempting to show less than 0 modal.')
      return
    }
    state.modalShowing -= 1
    debug(`${state.modalShowing} modal(s) is showing.`)
  },
}
