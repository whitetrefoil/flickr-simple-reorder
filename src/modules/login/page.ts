import { Component, Lifecycle, Vue } from 'av-ts'
import * as _                        from 'lodash'
import { store, types as t }         from '../../store'
import Panel                         from '../../components/panel'

@Component({
  name      : 'login-page',
  components: {
    Panel,
  },
})
export default class LoginPage extends Vue {

  isJustFailed = false

  requestToken() {
    store.dispatch(t.LOGIN__REQUEST_TOKEN)
  }

  get loginUrl(): string {
    return store.state.login.loginUrl
  }

  /**
   * The status of login page:
   * - 0 => Before login (redirecting to Flickr)
   * - 1 => Requesting token
   * - _ => Invalid (failed for some reason)
   */
  get status(): number {
    if (this.isJustFailed) { return -1 }
    if (store.state.login.token != null) { return 1 }
    return 0
  }

  @Lifecycle mounted() {
    if (!_.isEmpty(this.$route.query['frob'])) {
      store.commit(t.LOGIN__SET_FROB, this.$route.query['frob'])
      this.requestToken()
    }
  }
}
