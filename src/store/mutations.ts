import { getLogger } from '../services/log'
import * as t        from './types'
import { IAppState } from './state'

const { debug } = getLogger('/store/mutations.ts')

export const mutations = {
  [t.ONE_MORE_MODAL](state: IAppState) {
    debug('One more modal!')
    state.modalShowing += 1
    debug(`${state.modalShowing} modal(s) is showing.`)
  },

  [t.ONE_LESS_MODAL](state: IAppState) {
    debug('One more modal!')
    if (state.modalShowing <= 0) {
      debug('Warning! Attempting to show less than 0 modal.')
      return
    }
    state.modalShowing -= 1
    debug(`${state.modalShowing} modal(s) is showing.`)
  },
}
