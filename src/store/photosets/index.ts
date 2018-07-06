import { actions, IPhotosetsDispatchPayload } from './actions'
import { IPhotosetsCommitPayload, mutations } from './mutations'
import { state }                              from './state'


export type IPhotosetsPayload =
  |IPhotosetsCommitPayload
  |IPhotosetsDispatchPayload


export const photosets = {
  actions,
  mutations,
  state,
}
