import { getters }                        from './getters'
import { IModalCommitPayload, mutations } from './mutations'
import { state }                          from './state'


export type IModalPayload = IModalCommitPayload


export const modal = {
  getters,
  mutations,
  state,
}
