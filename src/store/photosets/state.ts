export type PhotosetStatus = null | 'processing' | 'skipped' | 'done' | 'error'

export interface IPhotoset {
  id: string
  photos: number
  url_m: string
  height_m: number
  width_m: number
  title: string
  status: PhotosetStatus
}

export interface IPhotosetsState {
  // `undefined` means not initialized yet.
  // `[]` means it's just empty.
  photosets: IPhotoset[] | undefined
}

export const state: IPhotosetsState = {
  photosets: undefined,
}
