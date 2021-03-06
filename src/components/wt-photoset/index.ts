import { Component, p, Prop, Vue }     from 'av-ts'
import * as API                        from '../../api/types/api'
import { IPayload, store, types as t } from '../../store'
import { Status }                      from '../../store/photosets/state'

const ASPECT_RADIO_THRESHOLD = 2 / 3

@Component({
  name: 'wt-photoset',
})
export default class WtPhotoset extends Vue {

  @Prop photoset = p({
    type: Object,
  }) as API.IPhotoset

  get classes(): string[] {
    const aspectRadio = this.photoset.height / this.photoset.width
    return aspectRadio > ASPECT_RADIO_THRESHOLD
      ? ['fit-width'] : ['fit-height']
  }

  get style(): object {
    return {
      backgroundImage: `url("${this.photoset.url}")`,
    }
  }

  get status(): Status {
    return store.state.photosets.statuses[this.photoset.id]
  }

  get buttonClass(): string[] {
    switch (this.status) {
      case Status.Done:
        return ['done']
      case Status.Processing:
        return ['processing']
      case Status.Skipped:
        return ['skipped']
      case Status.Error:
        return ['error']
      default:
        return ['']
    }
  }

  get iconClass(): string[] {
    switch (this.status) {
      case 'skipped':
      case 'done':
        return ['ivu-icon-checkmark']
      case 'processing':
        return ['ivu-icon-play']
      case 'error':
        return ['ivu-icon-alert']
      default:
        return ['ivu-icon-compose']
    }
  }

  get photosetUrl(): string {
    if (store.state.login.user == null) {
      throw new Error('No user info exists.')
    }
    return `${store.state.login.user!.photosUrl}sets/${this.photoset.id}`
  }

  click(photoset: API.IPhotoset) {

    if (store.state.login.user == null || store.state.login.token == null) {
      throw new Error('Login info is invalid now.')
    }

    store.dispatch<IPayload>({
      type   : t.PHOTOSETS__ORDER_SET,
      nsid   : store.state.login.user!.nsid,
      setId  : photoset.id,
      orderBy: store.state.photosets.preferences.orderBy,
      isDesc : store.state.photosets.preferences.isDesc,
      token  : store.state.login.token!.key,
      secret : store.state.login.token!.secret,
    })
  }
}
