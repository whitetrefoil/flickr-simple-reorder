import { Component, Vue, Prop, p, Lifecycle } from 'av-ts'
import ICircle from 'iview/src/components/circle'
import IButton from 'iview/src/components/button'
import WtModal from '../../../components/wt-modal'
import WtPanel from '../../../components/wt-panel'
import WtProgress from '../../../components/wt-progress'

@Component({
  name      : 'reordering-all',
  components: {
    ICircle,
    IButton,
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

  // display = {
  //   successes: 0,
  //   skipped  : 0,
  //   failures : 0,
  // }
  //
  // timer: number = null

  get finished(): boolean {
    return this.successes + this.skipped + this.failures >= this.total
  }

  get color(): string {
    switch (true) {
      case this.failures > 0 :
        return 'error'
      case this.total === this.skipped:
        return 'warning'
      case this.finished:
        return 'success'
      default:
        return 'info'
    }
  }

  close(): void {
    this.$emit('close')
  }
  //
  // @Lifecycle
  // mounted() {
  //   this.timer = window.setInterval(() => {
  //     this.display.successes = this.successes
  //     this.display.skipped   = this.skipped
  //     this.display.failures  = this.failures
  //   }, 2000)
  // }
  //
  // @Lifecycle
  // beforeDestroy() {
  //   window.clearInterval(this.timer)
  // }
}
