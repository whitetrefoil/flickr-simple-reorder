import { Component, Vue, Prop, p } from 'av-ts'

@Component({
  name: 'wt-button',
})
export default class WtButton extends Vue {

  @Prop color = p({
    type   : String,
    default: 'secondary',
  }) as string

  get buttonClass(): string {
    return `wt-button-${this.color}`
  }
}
