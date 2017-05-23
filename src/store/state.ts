import { ILoginState }     from './login/state'
import { IPhotosetsState } from './photosets/state'

export interface IRootState {
  login: ILoginState
  photosets: IPhotosetsState
}
