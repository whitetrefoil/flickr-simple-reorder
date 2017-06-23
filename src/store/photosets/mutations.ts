import * as _        from 'lodash'
import * as API      from '../../api/types/api'
import { getLogger } from '../../services/log'
import Storage       from '../../services/storage'
import * as t        from '../types'
import {
  IPhotosetsState,
  IPhotosetStatus,
  IPreferences,
} from './state'

const { debug } = getLogger('/store/photosets/mutations.ts')

interface ISetStatusPayload {
  id: string
  status: IPhotosetStatus
}

export const mutations = {
  [t.PHOTOSETS__SET_LIST](state: IPhotosetsState, photosets: API.IPhotoset[] | null | undefined) {
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

  [t.PHOTOSETS__SET_PREFERENCE](state: IPhotosetsState, pref: IPreferences) {
    state.preferences.orderBy = pref.orderBy
    state.preferences.isDesc  = pref.isDesc
    Storage.set('preferences', {
      f: state.preferences.orderBy,
      o: state.preferences.isDesc,
    })
  },
}
