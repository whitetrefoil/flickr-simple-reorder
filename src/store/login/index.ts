import { actions, ILoginDispatchPayload } from './actions'
import { ILoginCommitPayload, mutations } from './mutations'
import { state }                          from './state'


export type ILoginPayload =
  |ILoginCommitPayload
  |ILoginDispatchPayload


export const login = {
  actions,
  mutations,
  state,
}
