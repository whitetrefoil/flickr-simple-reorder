// import Storage from '../../services/storage'
//
export type IPhotosetStatus = null | 'processing' | 'skipped' | 'done' | 'error'
export type IPreferenceOrderBy = 'datetaken' | 'dateupload' | 'title' | 'views'

export interface IPhotoset {
  id: string
  photos: number
  url_m: string
  height_m: number
  width_m: number
  title: string
  status: IPhotosetStatus
}

export interface IPreferences {
  orderBy: IPreferenceOrderBy
  isDesc: boolean
}

export interface IPhotosetsState {
  // `undefined` means not initialized yet.
  // `[]` means it's just empty.
  photosets: IPhotoset[] | undefined
  preferences: IPreferences
}
//
// export const state: IPhotosetsState = {
//   photosets  : undefined,
//   preferences: {
//     orderBy: Storage.get('orderBy') || 'dateupload',
//     isDesc : Storage.get('isDesc') !== false,
//   },
// }
