import { Component, Vue } from 'av-ts'
import MainNav            from '../main-nav'

@Component({
  name: 'app',
  components: {
    MainNav,
  },
})
export default class App extends Vue {
}
