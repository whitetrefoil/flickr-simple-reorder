import { getLogger }      from '@whitetrefoil/debug-log'
import { Component, Vue } from 'av-ts'
import * as _             from 'lodash'
import { store }          from '../../store'

const log = getLogger('/components/wt-main-nav')

@Component({
  name: 'wt-main-nav',
})
export default class WtMainNav extends Vue {

  isMenuShown = false

  get hasLoggedIn(): boolean {
    return !_.isEmpty(_.get(store.state, 'login.token'))
           && !_.isEmpty(_.get(store.state, 'login.user'))
  }

  get userName(): string {
    return _.get(store.state, 'login.user.username') as string
  }

  get userAvatarUrl(): string {
    const farm   = _.get(store.state, 'login.user.iconFarm')
    const server = _.get(store.state, 'login.user.iconServer')
    const nsid   = _.get(store.state, 'login.user.nsid')
    if (_.isNil(farm) || _.isNil(server) || _.isNil(nsid)) {
      return 'about:blank'
    }
    return `https://farm${farm}.staticflickr.com/${server}/buddyicons/${nsid}.jpg`
  }

  get profileUrl(): string {
    return _.get(store.state, 'login.user.profileUrl') as string
  }
}
