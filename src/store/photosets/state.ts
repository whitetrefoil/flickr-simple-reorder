import * as _   from 'lodash'
import * as API from '../../api/types/api'
import Storage  from '../../services/storage'

export type IStatus = null|'processing'|'skipped'|'done'|'error'

export interface IPhotosetStatuses {
  [id: string]: IStatus
}

// export interface IPhotosetWithStatus extends API.IPhotoset {
//   status: IStatus
// }

export interface IPreferences {
  orderBy?: API.IOrderByOption
  isDesc: boolean
}

export interface IPhotosetsState {
  // `undefined` means not initialized yet.
  // `[]` means it's just empty.
  photosets: API.IPhotoset[]|undefined
  statuses: IPhotosetStatuses
  preferences: IPreferences
}


export const state: IPhotosetsState = {
  photosets  : undefined,
  statuses   : {},
  preferences: {
    orderBy: undefined,
    isDesc : false,
  },
}

const storedPreferences = Storage.get('preferences')

if (storedPreferences != null) {
  state.preferences.orderBy = _.isEmpty(_.get(storedPreferences, 'f')) ? 'dateUpload' : storedPreferences.f
  state.preferences.isDesc  = _.isBoolean(_.get(storedPreferences, 'o')) ? storedPreferences.o : true
}
