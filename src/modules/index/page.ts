import { getLogger }                        from '@whitetrefoil/debug-log'
import { Component, Lifecycle, Vue, Watch } from 'av-ts'
import IButton                              from 'iview/src/components/button'
import IIcon                                from 'iview/src/components/icon'
import IInput                               from 'iview/src/components/input'
import IOption                              from 'iview/src/components/select/option'
import ISelect                              from 'iview/src/components/select/select'
import ISwitch                              from 'iview/src/components/switch'
import * as _                               from 'lodash'
import * as API                             from '../../api/types/api'
import WtPanel                              from '../../components/wt-panel'
import WtPhotoset                           from '../../components/wt-photoset'
import { IPayload, store, types as t }      from '../../store'
import { BulkReorderProgressEmitter }       from '../../store/photosets/actions'
import { Status }                           from '../../store/photosets/state'
import ReorderAllConfirm                    from './reorder-all-confirm'
import ReorderingAll                        from './reordering-all'

// `null` for normal case.
const enum PageStatus {
  Loading = 'loading',
  Error   = 'error',
  Normal  = 'normal',
}


const { debug } = getLogger(`/src/${__filename.split('?')[0]}`)


@Component({
  name      : 'index-page',
  components: {
    IButton,
    IIcon,
    IInput,
    IOption,
    ISelect,
    ISwitch,
    WtPanel,
    WtPhotoset,
    ReorderAllConfirm,
    ReorderingAll,
  },
})
export default class IndexPage extends Vue {

  status          = PageStatus.Normal
  isConfirming    = false
  isReorderingAll = false
  isSearchFocused = false

  orderByOptions = {
    dateTaken : 'Taken',
    dateUpload: 'Uploaded',
    title     : 'Title',
    views     : 'Views',
  }

  reorderingAllStatus = {
    successes: 0,
    skipped  : 0,
    failures : 0,
  }

  filter: string = ''

  get hasLoggedIn(): boolean {
    return !_.isEmpty(store.state.login.token)
           && !_.isEmpty(store.state.login.user)
  }

  get filteredSets(): API.IPhotoset[] {
    if (_.isEmpty(this.filter)) { return this.photosets }
    return _.filter(this.photosets, (set) => _.includes(_.toLower(set.title), _.toLower(this.filter)))
  }

  get photosets(): API.IPhotoset[] {
    const photosets = store.state.photosets.photosets
    if (_.isNil(photosets) || _.isEmpty(photosets)) {
      return []
    }
    return photosets
  }

  get totalPhotosets(): number {
    return this.filteredSets == null ? 0 : this.filteredSets.length
  }

  retry(): void {
    this.load()
  }

  load(): void {
    if (!this.hasLoggedIn
        || store.state.login.token == null
        || store.state.login.user == null
    ) { return }

    if (store.state.login.user == null) {
      throw new Error('Seems logged in but no user info exists.')
    }

    this.status = PageStatus.Loading
    store.dispatch<IPayload>({
      type  : t.PHOTOSETS__GET_LIST,
      token : store.state.login.token.key,
      secret: store.state.login.token.secret,
      nsid  : store.state.login.user.nsid,
    })
      .then(() => {
        this.status = PageStatus.Normal
      }, () => {
        this.status = PageStatus.Error
      })
  }

  async reorderAll(): Promise<void> {

    if (store.state.login.user == null || store.state.login.token == null) {
      throw new Error('Login info is invalid now.')
    }

    this.reorderingAllStatus.successes = 0
    this.reorderingAllStatus.skipped   = 0
    this.reorderingAllStatus.failures  = 0

    store.dispatch<IPayload>({
      type   : t.PHOTOSETS__BULK_ORDER_SET,
      nsid   : store.state.login.user.nsid,
      setIds : _.map(this.filteredSets, (ps) => ps.id),
      orderBy: store.state.photosets.preferences.orderBy,
      isDesc : store.state.photosets.preferences.isDesc,
      token  : store.state.login.token.key,
      secret : store.state.login.token.secret,
    })
      .then((emitter: BulkReorderProgressEmitter) => {
        emitter.on('finish', () => {
          debug('Bulk reordering finished')
        })

        emitter.on('success', () => {
          this.reorderingAllStatus.successes += 1
        })

        emitter.on('fail', () => {
          this.reorderingAllStatus.failures += 1
        })

        emitter.on('skip', () => {
          this.reorderingAllStatus.skipped += 1
        })
      })
  }

  async reorderAllOneByOne() {
    if (store.state.login.user == null || store.state.login.token == null) {
      throw new Error('Login info is invalid now.')
    }

    this.reorderingAllStatus.successes = 0
    this.reorderingAllStatus.skipped   = 0
    this.reorderingAllStatus.failures  = 0

    _.forEach(this.filteredSets, async(ps) => {
      try {
        await store.dispatch<IPayload>({
          type           : t.PHOTOSETS__ORDER_SET,
          nsid           : store.state.login.user!.nsid,
          setId          : ps.id,
          orderBy        : store.state.photosets.preferences.orderBy,
          isDesc         : store.state.photosets.preferences.isDesc,
          token          : store.state.login.token!.key,
          secret         : store.state.login.token!.secret,
          needLongTimeout: true,
        })
        const result = store.state.photosets.statuses[ps.id]
        switch (result) {
          case Status.Done:
            this.reorderingAllStatus.successes += 1
            break
          case Status.Skipped:
            this.reorderingAllStatus.skipped += 1
            break
          case Status.Error:
          default:
            this.reorderingAllStatus.failures += 1
        }
      } catch (e) {
        this.reorderingAllStatus.failures += 1
      }
    })
  }

  onOrderByChange(value: API.IOrderByOption) {
    store.commit<IPayload>({
      type   : t.PHOTOSETS__SET_PREFERENCE,
      orderBy: value,
      isDesc : store.state.photosets.preferences.isDesc,
    })
  }

  onIsDescChange(value: boolean) {
    store.commit<IPayload>({
      type   : t.PHOTOSETS__SET_PREFERENCE,
      orderBy: store.state.photosets.preferences.orderBy,
      isDesc : value,
    })
  }

  onReorderAllClick() {
    this.isConfirming = true
  }

  onSearchFocus() {
    this.isSearchFocused = true
  }

  onSearchBlur() {
    this.isSearchFocused = false
  }

  confirmed() {
    this.isReorderingAll = true
    this.$nextTick(() => {
      this.isConfirming = false
    })
    this.reorderAll()
      .catch((error) => {
        debug(error.message)
      })
  }

  canceled() {
    this.isConfirming = false
  }

  oneByOne() {
    this.isReorderingAll = true
    this.$nextTick(() => {
      this.isConfirming = false
    })
    this.reorderAllOneByOne()
      .catch((error) => {
        debug(error.message)
      })
  }

  closed() {
    this.isReorderingAll = false
  }

  @Watch('hasLoggedIn')
  handler(newVal: boolean) {
    if (newVal === true) {
      this.load()
    }
  }

  @Lifecycle
  created(): void {
    this.load()
  }
}
