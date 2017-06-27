import { Component, Lifecycle, Vue } from 'av-ts'
import * as _                        from 'lodash'
import IButton                       from 'iview/src/components/button'
import { store, types as t }         from '../../store'
import WtPanel                       from '../../components/wt-panel'
import { getLogger }                 from '../../services/log'

const LOGIN_URL_TEMPLATE = 'https://www.flickr.com/services/oauth/authorize?oauth_token={{token}}&perms=write'

const debug = getLogger('/modules/login/page.ts').debug

@Component({
  name      : 'login-page',
  components: {
    IButton,
    WtPanel,
  },
})
export default class LoginPage extends Vue {

  isNetworkError         = false
  isRespondedError       = false
  isRequestingLoginToken = false
  loginUrl: string       = null

  async requestLoginUrl(): Promise<void> {
    this.isNetworkError         = false
    this.isRespondedError       = false
    this.isRequestingLoginToken = true
    this.loginUrl               = null
    try {
      await store.dispatch(t.LOGIN__REQUEST_LOGIN_TOKEN)
      const loginToken = store.state.login.token
      this.loginUrl    = LOGIN_URL_TEMPLATE.replace('{{token}}', loginToken.key)
    } catch (e) {
      debug('Failed to request login token', e)
      if (e.response != null) {
        this.isRespondedError = true
      } else {
        this.isNetworkError = true
      }
      this.loginUrl = null
    }
    this.isRequestingLoginToken = false
    window.location.href = this.loginUrl
  }

  async verifyToken() {
    this.isNetworkError   = false
    this.isRespondedError = false
    try {
      await store.dispatch(t.LOGIN__REQUEST_ACCESS_TOKEN, this.$route.query['oauth_verifier'])
      this.$router.push({ name: 'index' })
    } catch (e) {
      debug('Failed to request access token', e)
      if (e.response != null) {
        this.isRespondedError = true
      } else {
        this.isNetworkError = true
      }
    }
  }

  async login(): Promise<void> {
    const url = await this.requestLoginUrl()
  }

  gotVerifier(): boolean {
    const verifier = _.get(this.$route.query, 'oauth_verifier')
    if (_.isEmpty(verifier)) { return false }

    const token = _.get(this.$route.query, 'oauth_token')
    if (token !== store.state.login.token.key) {
      return false
    }

    return true
  }

  /**
   * The status of login page:
   * - 0  => Before login
   * - 1  => Requesting login token or redirecting to Flickr
   * - 2  => Verifying token
   * - -1 => Network error
   * - _  => Invalid (failed for some reason)
   */
  get status(): number {
    switch (true) {
      case this.isRespondedError:
        return -2
      case this.isNetworkError:
        return -1
      case this.isRequestingLoginToken || this.loginUrl != null:
        return 1
      case this.gotVerifier():
        return 2
      default:
        return 0
    }
  }

  @Lifecycle mounted() {
    switch (this.status) {
      case 2:
        this.verifyToken()
        break
      default:
      // Do nothing
    }
  }
}
