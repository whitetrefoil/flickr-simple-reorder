import { Component, p, Prop, Vue } from 'av-ts'
import { IPhotoset } from '../../store/photosets/state'

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
}
