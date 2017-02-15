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
}
