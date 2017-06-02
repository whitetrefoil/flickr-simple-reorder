import { Component, Vue, Prop, p } from 'av-ts'
import WtButton                    from '../../../components/wt-button'
import WtModal                     from '../../../components/wt-modal'
import WtPanel                     from '../../../components/wt-panel'

@Component({
  name      : 'reorder-all-confirm',
  components: {
    WtButton,
    WtModal,
    WtPanel,
  },
})
export default class ReorderAllConfirm extends Vue {
  @Prop isShowing = p({ type: Boolean, default: false }) as boolean
  @Prop total     = p({ type: Number, required: true }) as number

  confirm() {
    this.$emit('confirm')
  }

  cancel() {
    this.$emit('cancel')
  }
}
