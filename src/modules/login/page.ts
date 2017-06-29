import { Component, Lifecycle, Vue } from 'av-ts'
import * as _                        from 'lodash'
import IButton                       from 'iview/src/components/button'
import { store, types as t }         from '../../store'
import WtPanel                       from '../../components/wt-panel'
import { getLogger }                 from '../../services/log'

const LOGIN_URL_TEMPLATE = 'https://www.flickr.com/services/oauth/authorize?oauth_token={{token}}&perms=write'

const enum Status {
  Before     = 0,
  Requesting = 1,
  Verifying  = 2,
  Error      = -1,
  Invalid,
}

const debug = getLogger('/modules/login/page.ts').debug

@Component({
  name      : 'login-page',
  components: {
    IButton,
    WtPanel,
  },
})
export default class LoginPage extends Vue {

  status           = Status.Before
  loginUrl: string = null

  async requestLoginUrl(): Promise<void> {
    this.status   = Status.Requesting
    this.loginUrl = null
    try {
      await store.dispatch(t.LOGIN__REQUEST_LOGIN_TOKEN)
      const loginToken = store.state.login.token
      this.loginUrl    = LOGIN_URL_TEMPLATE.replace('{{token}}', loginToken.key)
    } catch (e) {
      debug('Failed to request login token', e)
      if (e.response != null) {
        this.status = Status.Invalid
      } else {
        this.status = Status.Error
      }
      this.loginUrl = null
    }
    if (!_.isEmpty(this.loginUrl)) {
      window.location.href = this.loginUrl
    }
  }

  async verifyToken() {
    this.status = Status.Verifying
    try {
      await store.dispatch(t.LOGIN__REQUEST_ACCESS_TOKEN, this.$route.query['oauth_verifier'])
      this.$router.push({ name: 'index' })
    } catch (e) {
      debug('Failed to request access token', e)
      if (e.response != null) {
        this.status = Status.Invalid
      } else {
        this.status = Status.Error
      }
    }
  }

  async login(): Promise<void> {
    await this.requestLoginUrl()
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

  @Lifecycle mounted() {
    if (this.gotVerifier()) { this.verifyToken() }
  }
}
