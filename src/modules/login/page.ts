import { Component, Lifecycle, Vue } from 'av-ts'
import * as _                        from 'lodash'
import IButton                       from 'iview/src/components/button'
import * as API                      from '../../api/types/api'
import { store, types as t }         from '../../store'
import WtPanel                       from '../../components/wt-panel'
import { getLogger }                 from '../../services/log'

const LOGIN_URL_TEMPLATE = 'https://www.flickr.com/services/oauth/authorize?oauth_token={{token}}&perms=write'

const debug = getLogger('/src/modules/login/page.ts').debug

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
    this.isNetworkError = false
    this.isRespondedError = false
    this.isRequestingLoginToken = true
    this.loginUrl = null
    try {
      const loginToken = await store.dispatch(t.LOGIN__REQUEST_LOGIN_TOKEN) as any as API.IToken
      this.loginUrl = LOGIN_URL_TEMPLATE.replace('{{token}}', loginToken.key)
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
  }

  async verifyToken() {
    throw new Error('TODO')
  }

  async login() {
    const url = await this.requestLoginUrl()
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
    if (this.isRespondedError) { return -2 }
    if (this.isNetworkError) { return -1 }
    if (this.isRequestingLoginToken || this.loginUrl != null) { return 1 }
    if (!_.isEmpty(_.get(this.$route.query, 'oauth_verifier'))) { return 2 }
    return 0
  }

  @Lifecycle mounted() {
    // if (this.status === 2) {
    //   this.verifyToken()
    //     .then(() => {
    //       this.$router.push({ name: 'index' })
    //     }, () => {
    //       this.isJustFailed = true
    //     })
    // }
  }
}
