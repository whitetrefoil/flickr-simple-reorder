import { Component, Vue, Prop, p } from 'av-ts'

@Component({
  name: 'panel',
})
export default class Panel extends Vue {

  @Prop title = p(String) as string

  @Prop color = p({
    type   : String,
    default: 'secondary',
  }) as string

  get cardClass(): string {
    return `card-outline-${this.color}`
  }

  get titleClass(): string {
    return `text-${this.color}`
  }
}
