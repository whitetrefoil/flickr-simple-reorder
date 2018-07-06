import { ILoginState }     from './login/state'
import { IModalState }     from './modal/state'
import { IPhotosetsState } from './photosets/state'


export interface IRootState {
  login: ILoginState
  modal: IModalState
  photosets: IPhotosetsState
}
