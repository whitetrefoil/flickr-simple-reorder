import { Component, Lifecycle, p, Prop, Vue, Watch } from 'av-ts'
import { store, types as t }                         from '../../store'
import WtPanel                                       from '../wt-panel'

type Size = 'large'|'medium'|'small'|'tiny'

@Component({
  name      : 'wt-modal',
  components: {
    WtPanel,
  },
})
export default class WtModal extends Vue {
  @Prop isShowing = p({ type: Boolean, default: false })
  @Prop title     = p({ type: String })
  @Prop color     = p({ type: String })
  @Prop size      = p({ type: String, default: 'medium' }) as Size

  get sizeClass() {
    return `wt-modal-${this.size}`
  }

  @Watch('isShowing') isShowingHandler(goingToShow: boolean) {
    if (goingToShow) {
      store.commit(t.ONE_MORE_MODAL)
    } else {
      store.commit(t.ONE_LESS_MODAL)
    }
  }

  @Lifecycle destroyed() {
    if (this.isShowing) {
      store.commit(t.ONE_LESS_MODAL)
    }
  }
}
