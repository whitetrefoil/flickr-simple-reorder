import { IAppState }       from './app/state'
import { ILoginState }     from './login/state'
import { IPhotosetsState } from './photosets/state'

export interface IRootState {
  app: IAppState
  login: ILoginState
  photosets: IPhotosetsState
}
