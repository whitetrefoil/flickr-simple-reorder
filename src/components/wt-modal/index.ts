import { Component, Lifecycle, p, Prop, Vue, Watch } from 'av-ts'
import { getLogger }                                 from '../../services/log'
import { store, types as t }                         from '../../store'
import WtPanel                                       from '../wt-panel'

type Size = 'large' | 'medium' | 'small' | 'tiny'

const { debug } = getLogger('/components/wt-modal/index.ts')

@Component({
  name      : 'wt-modal',
  components: {
    WtPanel,
  },
})
export default class WtModal extends Vue {
  @Prop isShowing = p({ type: Boolean, default: false }) as boolean
  @Prop title     = p({ type: String }) as string
  @Prop color     = p({ type: String }) as string
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