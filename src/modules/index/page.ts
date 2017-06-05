import { Component, Lifecycle, Vue, Watch }               from 'av-ts'
import * as _                                             from 'lodash'
import IIcon                                              from 'iview/src/components/icon'
import IOption                                            from 'iview/src/components/select/option'
import ISelect                                            from 'iview/src/components/select/select'
import ISwitch                                            from 'iview/src/components/switch'
import WtButton                                           from '../../components/wt-button'
import WtPanel                                            from '../../components/wt-panel'
import WtPhotoset                                         from '../../components/wt-photoset'
import { IPhotoset, IPhotosetStatus, IPreferenceOrderBy } from '../../store/photosets/state'
import { store, types as t }                              from '../../store'
import ReorderAllConfirm                                  from './reorder-all-confirm'
import ReorderingAll                                      from './reordering-all'


const ORDER_BY_OPTIONS = [
  { value: 'dateupload', label: 'Upload Time' },
  { value: 'datetaken', label: 'Taken Time' },
  { value: 'title', label: 'Title' },
  { value: 'views', label: 'Views Count' },
]

@Component({
  name      : 'index-page',
  components: {
    IIcon,
    IOption,
    ISelect,
    ISwitch,
    WtButton,
    WtPanel,
    WtPhotoset,
    ReorderAllConfirm,
    ReorderingAll,
  },
})
export default class IndexPage extends Vue {

  isLoading       = false
  failedToGetList = false
  isConfirming    = false
  isReorderingAll = false

  orderByOptions = {
    datetaken : 'Taken',
    dateupload: 'Uploaded',
    title     : 'Title',
    views     : 'Views',
  }

  reorderingAllStatus = {
    successes: 0,
    skipped  : 0,
    failures : 0,
  }

  get hasLoggedIn(): boolean {
    return !_.isEmpty(_.get(store.state, 'login.token'))
      && !_.isEmpty(_.get(store.state, 'login.user'))
  }

  get photosets(): IPhotoset[] {
    if (_.isNil(store.state.photosets.photosets) || _.isEmpty(store.state.photosets.photosets)) {
      return
    }
    return store.state.photosets.photosets
  }

  get totalPhotosets(): number {
    return this.photosets == null ? 0 : this.photosets.length
  }

  load(): void {
    if (!this.hasLoggedIn) { return }

    this.isLoading = true
    store.dispatch(t.PHOTOSETS__GET_LIST)
      .then(() => {
        this.isLoading = false
      }, () => {
        this.isLoading       = false
        this.failedToGetList = true
      })
  }

  async reorderAll(): Promise<void> {
    this.reorderingAllStatus.successes = 0
    this.reorderingAllStatus.skipped = 0
    this.reorderingAllStatus.failures = 0
    _.forEach(store.state.photosets.photosets, async(photoset) => {
      try {
        const result = await store.dispatch(t.PHOTOSETS__ORDER_SET, photoset) as any as IPhotosetStatus
        switch (result) {
          case 'done': this.reorderingAllStatus.successes += 1; return
          case 'skipped': this.reorderingAllStatus.skipped += 1; return
          default: throw new Error(`Unknown reorder result: ${result}`)
        }
      } catch (e) {
        this.reorderingAllStatus.failures += 1
      }
    })
  }

  onOrderByChange(value: IPreferenceOrderBy) {
    store.commit(t.PHOTOSETS__SET_PREFERENCE_ORDER_BY, value)
  }

  onIsDescChange(value: boolean) {
    store.commit(t.PHOTOSETS__SET_PREFERENCE_IS_DESC, value)
  }

  onReorderAllClick() {
    this.isConfirming = true
  }

  confirmed() {
    this.isReorderingAll = true
    this.$nextTick(() => {
      this.isConfirming = false
    })
    this.reorderAll()
  }

  canceled() {
    this.isConfirming = false
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
