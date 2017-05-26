import * as _                                         from 'lodash'
import { getLogger }                                  from '../../services/log'
import * as t                                         from '../types'
import { IPhotoset, IPhotosetsState, PhotosetStatus } from './state'

const { debug } = getLogger('/store/photosets/mutations.ts')

interface ISetStatusPayload {
  id: string
  status: PhotosetStatus
}

export const mutations = {
  [t.PHOTOSETS__SET_LIST](state: IPhotosetsState, photosets: IPhotoset[] | null | undefined) {
    debug('Set list')
    state.photosets = photosets
  },

  [t.PHOTOSETS__SET_STATUS](state: IPhotosetsState, payload: ISetStatusPayload) {
    debug(`Setting status of photoset ${payload.id} to "${payload.status}"`)

    const photoset = _.find(state.photosets, _.matches({ id: payload.id }))
    if (photoset == null) {
      debug(`no such photoset ${payload.id} found!`)
      return
    }

    photoset.status = payload.status
  },
}
