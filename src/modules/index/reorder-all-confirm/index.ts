import { Component, Vue, Prop, p } from 'av-ts'
import IButton                     from 'iview/src/components/button'
import WtModal                     from '../../../components/wt-modal'
import WtPanel                     from '../../../components/wt-panel'

@Component({
  name      : 'reorder-all-confirm',
  components: {
    IButton,
    WtModal,
    WtPanel,
  },
})
export default class ReorderAllConfirm extends Vue {
  @Prop isShowing = p({ type: Boolean, default: false })
  @Prop total     = p({ type: Number, required: true })

  confirm() {
    this.$emit('confirm')
  }

  cancel() {
    this.$emit('cancel')
  }

  oneByOne() {
    this.$emit('oneByOne')
  }
}
