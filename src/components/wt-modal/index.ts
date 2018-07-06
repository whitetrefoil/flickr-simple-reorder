import { getLogger }                                 from '@whitetrefoil/debug-log'
import { Component, Lifecycle, p, Prop, Vue, Watch } from 'av-ts'
import { IPayload, store, types as t }               from '../../store'
import WtPanel                                       from '../wt-panel'

type Size = 'large'|'medium'|'small'|'tiny'


const { debug } = getLogger(`/src/${__filename.split('?')[0]}`)


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
      store.commit<IPayload>({ type: t.MODAL__ONE_MORE_MODAL })
    } else {
      store.commit<IPayload>({ type: t.MODAL__ONE_LESS_MODAL })
    }
  }

  @Lifecycle destroyed() {
    if (this.isShowing) {
      store.commit<IPayload>({ type: t.MODAL__ONE_LESS_MODAL })
    }
  }
}
