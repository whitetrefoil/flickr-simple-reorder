import { Component, p, Prop, Vue } from 'av-ts'
import { IPhotoset }               from '../../store/photosets/state'
import * as t                      from '../../store/types'

const ASPECT_RADIO_THRESHOLD = 2 / 3

@Component({
  name: 'wt-photoset',
})
export default class WtPhotoset extends Vue {

  @Prop photoset = p({
    type: Object,
  }) as IPhotoset

  get classes(): string[] {
    const aspectRadio = this.photoset.height_m / this.photoset.width_m
    return aspectRadio > ASPECT_RADIO_THRESHOLD
      ? ['fit-width'] : ['fit-height']
  }

  get style(): object {
    return {
      backgroundImage: `url("${this.photoset.url_m}")`,
    }
  }

  get buttonClass(): string[] {
    switch (this.photoset.status) {
      case 'done': return ['done']
      case 'processing': return ['processing']
      case 'skipped': return ['skipped']
      case 'error': return ['error']
      default: return ['']
    }
  }

  get iconClass(): string[] {
    switch (this.photoset.status) {
      case 'skipped':
      case 'done': return ['ivu-icon-checkmark']
      case 'processing': return ['ivu-icon-play']
      case 'error': return ['ivu-icon-alert']
      default: return ['ivu-icon-compose']
    }
  }

  click(photoset: IPhotoset) {
    this.$store.dispatch(t.PHOTOSETS__ORDER_SET, photoset)
  }
}
