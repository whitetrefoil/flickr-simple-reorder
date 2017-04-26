import { Component, Vue } from 'av-ts'
import * as _             from 'lodash'
import { store }          from '../../store'

@Component({
  name: 'wt-main-nav',
})
export default class WtMainNav extends Vue {

  get hasLoggedIn(): boolean {
    return !_.isEmpty(_.get(store.state, 'login.token'))
      && !_.isEmpty(_.get(store.state, 'login.user'))
  }

  get userName(): string {
    return _.get(store.state, 'login.user.username._content') as string
  }

  get userAvatarUrl(): string {
    const farm = _.get(store.state, 'login.user.iconfarm')
    const server = _.get(store.state, 'login.user.iconserver')
    const nsid = _.get(store.state, 'login.user.nsid')
    return `http://farm${farm}.staticflickr.com/${server}/buddyicons/${nsid}.jpg`
  }
}
