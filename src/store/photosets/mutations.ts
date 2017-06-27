import * as _        from 'lodash'
import Vue           from 'vue'
import * as API      from '../../api/types/api'
import { getLogger } from '../../services/log'
import Storage       from '../../services/storage'
import * as t        from '../types'
import {
  IPhotosetsState,
  IPreferences,
  IStatus,
} from './state'

const { debug } = getLogger('/store/photosets/mutations.ts')

interface ISetStatusParams {
  id: string
  status: IStatus
}

export const mutations = {
  [t.PHOTOSETS__SET_LIST](state: IPhotosetsState, photosets: API.IPhotoset[] | null | undefined) {
    debug('Set list')
    state.photosets = photosets

    // Set default status
    const setIds = _.map(photosets, _.property('id')) as string[]
    if (state.statuses == null) { state.statuses = {} }
    _.forEach(setIds, (id) => {
      Vue.set(state.statuses, id, state.statuses[id] || null)
    })
  },

  [t.PHOTOSETS__SET_STATUS](state: IPhotosetsState, params: ISetStatusParams) {
    debug(`Setting status of photoset ${params.id} to "${params.status}"`)

    const photoset = _.find(state.photosets, _.matches({ id: params.id }))
    if (photoset == null) {
      debug(`no such photoset ${params.id} found!`)
      return
    }
    Vue.set(state.statuses, params.id, params.status)
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
