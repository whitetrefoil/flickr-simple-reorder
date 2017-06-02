import { Component, Vue } from 'av-ts'
import { store }          from '../../store'
import WtMainNav          from '../wt-main-nav'
import WtMask             from '../wt-mask'

@Component({
  name      : 'wt-app',
  components: {
    WtMainNav,
    WtMask,
  },
})
export default class WtApp extends Vue {
  get isMaskShowing() {
    return store.getters.shouldMaskShow
  }
}
