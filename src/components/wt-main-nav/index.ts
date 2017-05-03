import { Component, Vue } from 'av-ts'
import * as _             from 'lodash'
import { getLogger }      from '../../services/log'
import { store }          from '../../store'

const log = getLogger('/components/wt-main-nav')

@Component({
  name: 'wt-main-nav',
})
export default class WtMainNav extends Vue {

  isMenuShown = false

  get hasLoggedIn(): boolean {
    return !_.isEmpty(_.get(store.state, 'login.token'))
      && !_.isEmpty(_.get(store.state, 'login.user'))
  }

  get userName(): string {
    return _.get(store.state, 'login.user.username._content') as string
  }

  get userAvatarUrl(): string {
    const farm = _.get(store.state, 'login.user.iconfarm')
    const server = _.get(store.state, 'login.user.iconserver')
    const nsid = _.get(store.state, 'login.user.nsid')
    if (_.isNil(farm) || _.isNil(server) || _.isNil(nsid)) {
      return 'about:blank'
    }
    return `http://farm${farm}.staticflickr.com/${server}/buddyicons/${nsid}.jpg`
  }

  get menu(): Element {
    return this.$refs['menu'] as Element
  }

  setHeight(height: number): void {
    this.menu.setAttribute('style', `${this.menu.getAttribute('style') || ''};/**fsr-collapse**/height:${height}px/**fsr-collapse**/;`)
  }

  removeHeight(): void {
    this.menu.setAttribute('style', this.menu.getAttribute('style').replace(/;\/\*\*fsr-collapse\*\*\/height:\d*?px\/\*\*fsr-collapse\*\*\/;/g, ''))
  }

  toggleMenu(): void {
    log.debug('Toggle menu')

    // Call end manually in case it's clicked before previous transition ended.
    this.menuTransitionEnd()

    this.isMenuShown = !this.isMenuShown
    if (this.isMenuShown === true) {
      log.debug('Now hiding, going to show.')
      this.menu.classList.add('show')
      const height = this.menu.clientHeight
      this.menu.classList.remove('show')
      this.menu.classList.add('collapsing')
      this.menu.classList.add('show')
      setTimeout(() => {
        this.setHeight(height)
      }, 0)
    } else {
      log.debug('Now showing, going to hide.')
      const height = this.menu.clientHeight
      this.setHeight(height)
      this.menu.classList.add('collapsing')
      setTimeout(() => {
        this.removeHeight()
      }, 0)
    }
  }

  menuTransitionEnd(): void {
    log.debug('Menu transition ended.')
    if (this.isMenuShown === true) {
      log.debug('Previously hid, now showing.')
      this.menu.classList.remove('collapsing')
      this.removeHeight()
    } else {
      log.debug('Previously showed, now hiding.')
      this.menu.classList.remove('show')
      this.menu.classList.remove('collapsing')
    }
  }
}
