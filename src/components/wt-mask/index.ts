import { Component, p, Prop, Vue } from 'av-ts'

@Component({
  name: 'wt-mask',
})
export default class WtMask extends Vue {
  @Prop isShowing = p({ type: Boolean, default: false }) as boolean
}
