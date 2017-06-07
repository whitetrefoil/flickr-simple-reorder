import { Component, Lifecycle, Vue } from 'av-ts'
import * as _                        from 'lodash'
import { store, types as t }         from '../../store'
import WtPanel                       from '../../components/wt-panel'

@Component({
  name      : 'login-page',
  components: {
    WtPanel,
  },
})
export default class LoginPage extends Vue {

  isJustFailed = false

  requestToken() {
    return store.dispatch(t.LOGIN__REQUEST_TOKEN, this.$route.query['frob'])
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
    if (!_.isEmpty(_.get(this.$route.query, 'frob'))) { return 1 }
    return 0
  }

  @Lifecycle mounted() {
    if (!_.isEmpty(this.$route.query['frob'])) {
      this.requestToken()
        .then(() => {
          this.$router.push({ name: 'index' })
        }, () => {
          this.isJustFailed = true
        })
    }
  }
}
