import { Component, Lifecycle, Vue } from 'av-ts'
import * as _                        from 'lodash'
import { store, types as t }         from '../../store'

@Component({
  name: 'login-page',
})
export default class LoginPage extends Vue {

  requestToken() {
    store.dispatch(t.LOGIN__REQUEST_TOKEN)
  }

  @Lifecycle mounted() {
    if (!_.isEmpty(this.$route.query['frob'])) {
      store.commit(t.LOGIN__SET_FROB, this.$route.query['frob'])
      this.requestToken()
    }

    window['s'] = store
  }
}
