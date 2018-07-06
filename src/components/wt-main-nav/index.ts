import { getLogger }      from '@whitetrefoil/debug-log'
import { Component, Vue } from 'av-ts'
import * as _             from 'lodash'
import { store }          from '../../store'


const { debug } = getLogger(`/src/${__filename.split('?')[0]}`)


@Component({
  name: 'wt-main-nav',
})
export default class WtMainNav extends Vue {

  isMenuShown = false

  get hasLoggedIn(): boolean {
    return !_.isEmpty(store.state.login.token)
      && !_.isEmpty(store.state.login.user)
  }

  get userName(): string|undefined {
    return store.state.login.user == null ? undefined : store.state.login.user.username
  }

  get userAvatarUrl(): string|undefined {
    if (store.state.login.user == null) { return undefined }
    const farm   = store.state.login.user.iconFarm
    const server = store.state.login.user.iconServer
    const nsid   = store.state.login.user.nsid
    if (_.isNil(farm) || _.isNil(server) || _.isNil(nsid)) {
      return 'about:blank'
    }
    return `https://farm${farm}.staticflickr.com/${server}/buddyicons/${nsid}.jpg`
  }

  get profileUrl(): string {
    return _.get(store.state, 'login.user.profileUrl') as string
  }
}
