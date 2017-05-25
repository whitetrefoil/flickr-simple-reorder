import { Component, Vue, Prop, p } from 'av-ts'

@Component({
  name: 'wt-panel',
})
export default class WtPanel extends Vue {

  @Prop title = p(String) as string

  @Prop color = p({
    type   : String,
    default: 'secondary',
  }) as string

  get panelClass(): string {
    return `wt-panel-${this.color}`
  }
}
