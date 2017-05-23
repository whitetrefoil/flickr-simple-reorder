import { Component, Lifecycle, Vue } from 'av-ts'
import { store, types as t }         from '../../store'


@Component({
  name: 'index-page',
})
export default class IndexPage extends Vue {

  failedToGetList = false

  @Lifecycle
  beforeCreate(): void {
    store.dispatch(t.PHOTOSETS__GET_LIST)
      .catch(() => {
        this.failedToGetList = true
      })
  }

}
