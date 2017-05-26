import { Component, Lifecycle, Vue, Watch } from 'av-ts'
import * as _                               from 'lodash'
import WtPanel                              from '../../components/wt-panel'
import WtPhotoset                           from '../../components/wt-photoset'
import { IPhotoset }                        from '../../store/photosets/state'
import { store, types as t }                from '../../store'


@Component({
  name      : 'index-page',
  components: {
    WtPanel,
    WtPhotoset,
  },
})
export default class IndexPage extends Vue {

  isLoading       = false
  failedToGetList = false

  get hasLoggedIn(): boolean {
    return !_.isEmpty(_.get(store.state, 'login.token'))
      && !_.isEmpty(_.get(store.state, 'login.user'))
  }

  get photosets(): IPhotoset[] {
    if (_.isNil(store.state.photosets.photosets) || _.isEmpty(store.state.photosets.photosets)) {
      return
    }
    return store.state.photosets.photosets
  }

  load(): void {
    if (!this.hasLoggedIn) { return }

    this.isLoading = true
    store.dispatch(t.PHOTOSETS__GET_LIST)
      .then(() => {
        this.isLoading = false
      }, () => {
        this.isLoading       = false
        this.failedToGetList = true
      })
  }

  @Watch('hasLoggedIn')
  handler(newVal: boolean) {
    if (newVal === true) {
      this.load()
    }
  }

  @Lifecycle
  created(): void {
    this.load()
  }
}
