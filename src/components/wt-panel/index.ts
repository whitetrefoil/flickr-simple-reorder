import { Component, Vue, Prop, p } from 'av-ts'

@Component({
  name: 'wt-panel',
})
export default class WtPanel extends Vue {

  @Prop title = p(String)

  @Prop color = p({
    type   : String,
    default: 'secondary',
  })

  get panelClass(): string {
    return `wt-panel-${this.color}`
  }
}
