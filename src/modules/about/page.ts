import { Component, Vue } from 'av-ts'

@Component({
  name: 'about-page',
})
export default class AboutPage extends Vue {

  scrollCount = 0

  test() {
    this.scrollCount += 1
  }
}
