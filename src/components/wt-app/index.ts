import { Component, Vue } from 'av-ts'
import WtMainNav          from '../wt-main-nav'

@Component({
  name      : 'wt-app',
  components: {
    WtMainNav,
  },
})
export default class WtApp extends Vue {
}
