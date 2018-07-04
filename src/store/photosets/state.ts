import * as _   from 'lodash'
import * as API from '../../api/types/api'
import Storage  from '../../services/storage'


export const enum Status {
  Initial    = 'initial',
  Processing = 'processing',
  Skipped    = 'skipped',
  Done       = 'done',
  Error      = 'error',
}


export interface IPhotosetStatuses {
  [id: string]: Status
}

export interface IPreferences {
  orderBy: API.IOrderByOption
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
    orderBy: 'dateUpload',
    isDesc : true,
  },
}

const storedPreferences = Storage.get('preferences')
if (storedPreferences != null) {
  if (storedPreferences.f != null && !_.isEmpty(storedPreferences.f)) {
    state.preferences.orderBy = storedPreferences.f
  }
  if (storedPreferences.o != null && _.isBoolean(storedPreferences.o)) {
    state.preferences.isDesc = storedPreferences.o
  }
}
