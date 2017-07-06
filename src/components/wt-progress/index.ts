import { Component, Vue, Prop, p } from 'av-ts'

@Component({
  name: 'wt-progress',
})
export default class WtProgress extends Vue {
  @Prop total     = p({ type: Number, required: true })
  @Prop successes = p({ type: Number, required: true })
  @Prop skipped   = p({ type: Number, required: true })
  @Prop failures  = p({ type: Number, required: true })

  get successStyle(): object {
    return { width: `${this.successes / this.total * 100}%` }
  }

  get skippedStyle(): object {
    return { width: `${this.skipped / this.total * 100}%` }
  }

  get failureStyle(): object {
    return { width: `${this.failures / this.total * 100}%` }
  }
}
