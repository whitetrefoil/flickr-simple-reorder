import { getLogger }         from '@whitetrefoil/debug-log'
import { Component, Vue }    from 'av-ts'
import IButton               from 'iview/src/components/button'
import { isUndefined }       from 'lodash'
import WtPanel               from '../../components/wt-panel'
import { store, types as t } from '../../store'

const log = getLogger('/modules/logout/page.ts')

@Component({
  name      : 'logout-page',
  components: {
    IButton,
    WtPanel,
  },
})
export default class LogoutPage extends Vue {

  get hasLoggedOut(): boolean {
    return isUndefined(store.state.login.token)
  }

  logout(): void {
    log.debug('Going to logout')
    store.commit(t.LOGIN__UNSET_AUTH_INFO)
  }
}
