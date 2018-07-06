import { getLogger }                             from '@whitetrefoil/debug-log'
import * as _                                    from 'lodash'
import Vue                                       from 'vue'
import { MutationTree, Payload }                 from 'vuex'
import * as API                                  from '../../api/types/api'
import Storage                                   from '../../services/storage'
import * as t                                    from '../types'
import { IPhotosetsState, IPreferences, Status } from './state'


interface ISetListPayload extends Payload {
  type: typeof t.PHOTOSETS__SET_LIST
  photosets: API.IPhotoset[]|undefined
}

interface ISetStatusPayload extends Payload {
  type: typeof t.PHOTOSETS__SET_STATUS
  id: string
  status: Status
}

interface ISetPreference extends IPreferences, Payload {
  type: typeof t.PHOTOSETS__SET_PREFERENCE
}

export type IPhotosetsCommitPayload =
  |ISetListPayload
  |ISetStatusPayload
  |ISetPreference


const { debug } = getLogger(`/src/${__filename.split('?')[0]}`)


export const mutations: MutationTree<IPhotosetsState> = {
  [t.PHOTOSETS__SET_LIST](state, payload: ISetListPayload) {
    state.photosets = payload.photosets

    // Set default status
    const setIds = _.map(payload.photosets, _.property('id')) as string[]
    if (state.statuses == null) { state.statuses = {} }
    _.forEach(setIds, (id) => {
      Vue.set(state.statuses, id, state.statuses[id] || Status.Initial)
    })
  },

  [t.PHOTOSETS__SET_STATUS](state, { id, status }: ISetStatusPayload) {
    debug(`Setting status of photoset ${id} to "${status}"`)

    const photoset = _.find(state.photosets, _.matchesProperty('id', id))
    if (photoset == null) {
      debug(`no such photoset ${id} found!`)
      return
    }
    Vue.set(state.statuses, id, status)
  },

  [t.PHOTOSETS__SET_PREFERENCE](state, payload: ISetPreference) {
    state.preferences.orderBy = payload.orderBy
    state.preferences.isDesc  = payload.isDesc
    Storage.set('preferences', {
      f: state.preferences.orderBy,
      o: state.preferences.isDesc,
    })
  },
}
