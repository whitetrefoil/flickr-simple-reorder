import Storage from '../../services/storage'

export type PhotosetStatus = null | 'processing' | 'skipped' | 'done' | 'error'
export type PreferenceOrderBy = 'datetaken' | 'dateupload' | 'title' | 'views'

export interface IPhotoset {
  id: string
  photos: number
  url_m: string
  height_m: number
  width_m: number
  title: string
  status: PhotosetStatus
}

export interface IPreference {
  orderBy: PreferenceOrderBy
  isDesc: boolean
}

export interface IPhotosetsState {
  // `undefined` means not initialized yet.
  // `[]` means it's just empty.
  photosets: IPhotoset[] | undefined
  preference: IPreference
}

export const state: IPhotosetsState = {
  photosets : undefined,
  preference: {
    orderBy: Storage.get('orderBy') || 'dateupload',
    isDesc : Storage.get('isDesc') || false,
  },
}
