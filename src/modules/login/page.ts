import { getLogger }                 from '@whitetrefoil/debug-log'
import { Component, Lifecycle, Vue } from 'av-ts'
import IButton                       from 'iview/src/components/button'
import * as _                        from 'lodash'
import WtPanel                       from '../../components/wt-panel'
import { store, types as t }         from '../../store'


const LOGIN_URL_TEMPLATE = 'https://www.flickr.com/services/oauth/authorize?oauth_token={{token}}&perms=write'


const enum Status {
  Before     = 0,
  Requesting = 1,
  Verifying  = 2,
  Error      = -1,
  Invalid,
}


const { debug } = getLogger(`/src/${__filename.split('?')[0]}`)


@Component({
  name      : 'login-page',
  components: {
    IButton,
    WtPanel,
  },
})
export default class LoginPage extends Vue {

  status                     = Status.Before
  loginUrl: string|undefined = undefined

  async requestLoginUrl(): Promise<void> {
    this.status   = Status.Requesting
    this.loginUrl = undefined
    try {
      await store.dispatch(t.LOGIN__REQUEST_LOGIN_TOKEN)
      const loginToken = store.state.login.token
      if (loginToken == null) { throw new Error('Failed to acquire token') }
      this.loginUrl    = LOGIN_URL_TEMPLATE.replace('{{token}}', loginToken.key)
    } catch (e) {
      debug('Failed to request login token', e)
      if (e.response != null) {
        this.status = Status.Invalid
      } else {
        this.status = Status.Error
      }
      this.loginUrl = undefined
    }
    if (!_.isEmpty(this.loginUrl)) {
      window.location.assign(this.loginUrl!)
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

  async login() {
    await this.requestLoginUrl()
  }

  gotVerifier(): boolean {
    const verifier = _.get(this.$route.query, 'oauth_verifier')
    if (store.state.login.token == null || _.isEmpty(verifier)) { return false }

    const token = _.get(this.$route.query, 'oauth_token')

    return store.state.login.token != null && token === store.state.login.token.key
  }

  @Lifecycle
  async mounted() {
    if (this.gotVerifier()) {
      await this.verifyToken()
    }
  }
}
