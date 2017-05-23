import * as t                         from '../types'
import { IPhotoset, IPhotosetsState } from './state'
import { getLogger }                  from '../../services/log'

const { debug } = getLogger('/store/photosets/mutations.ts')

export const mutations = {
  [t.PHOTOSETS__SET_LIST](state: IPhotosetsState, photosets: IPhotoset[] | null | undefined) {
    state.photosets = photosets
    debug('Set photosets.')
  },
}
