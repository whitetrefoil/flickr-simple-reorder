import { Component, Vue, Prop, p } from 'av-ts'
import ICircle                     from 'iview/src/components/circle'
import WtButton                    from '../../../components/wt-button'
import WtModal                     from '../../../components/wt-modal'
import WtPanel                     from '../../../components/wt-panel'
import WtProgress                  from '../../../components/wt-progress'

@Component({
  name      : 'reordering-all',
  components: {
    ICircle,
    WtButton,
    WtModal,
    WtPanel,
    WtProgress,
  },
})
export default class ReorderingAll extends Vue {
  @Prop isShowing = p({ type: Boolean, default: false }) as boolean
  @Prop total     = p({ type: Number, required: true }) as number
  @Prop successes = p({ type: Number, required: true }) as number
  @Prop skipped   = p({ type: Number, required: true }) as number
  @Prop failures  = p({ type: Number, required: true }) as number

  get color(): string {
    switch (true) {
      case this.failures > 0 :
        return 'error'
      case this.total === this.skipped:
        return 'warning'
      case this.total === this.successes:
        return 'success'
      default:
        return 'info'
    }
  }

  close(): void {
    this.$emit('close')
  }
}
