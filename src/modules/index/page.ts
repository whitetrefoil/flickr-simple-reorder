import { Component, Lifecycle, Vue, Watch }               from 'av-ts'
import * as _                                             from 'lodash'
import IButton                                            from 'iview/src/components/button'
import IIcon                                              from 'iview/src/components/icon'
import IInput                                             from 'iview/src/components/input'
import IOption                                            from 'iview/src/components/select/option'
import ISelect                                            from 'iview/src/components/select/select'
import ISwitch                                            from 'iview/src/components/switch'
import * as API                                           from '../../api/types/api'
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

  isLoading       = false
  failedToGetList = false
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
    return !_.isEmpty(_.get(store.state, 'login.token'))
      && !_.isEmpty(_.get(store.state, 'login.user'))
  }

  get filteredSets(): API.IPhotoset[] {
    if (_.isEmpty(this.filter)) { return this.photosets }
    return _.filter(this.photosets, (set) => _.includes(_.toLower(set.title), _.toLower(this.filter)))
  }

  get photosets(): API.IPhotoset[] {
    if (_.isNil(store.state.photosets.photosets) || _.isEmpty(store.state.photosets.photosets)) {
      return
    }
    return store.state.photosets.photosets
  }

  get totalPhotosets(): number {
    return this.filteredSets == null ? 0 : this.filteredSets.length
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

  // async reorderAll(): Promise<void> {
  //   this.reorderingAllStatus.successes = 0
  //   this.reorderingAllStatus.skipped = 0
  //   this.reorderingAllStatus.failures = 0
  //   _.forEach(this.filteredSets, async(photoset) => {
  //     try {
  //       const result = await store.dispatch(t.PHOTOSETS__ORDER_SET, photoset) as any as IPhotosetStatus
  //       switch (result) {
  //         case 'done': this.reorderingAllStatus.successes += 1; return
  //         case 'skipped': this.reorderingAllStatus.skipped += 1; return
  //         default: throw new Error(`Unknown reorder result: ${result}`)
  //       }
  //     } catch (e) {
  //       this.reorderingAllStatus.failures += 1
  //     }
  //   })
  // }

  onOrderByChange(value: IPreferenceOrderBy) {
    store.commit(t.PHOTOSETS__SET_PREFERENCE_ORDER_BY, value)
  }

  onIsDescChange(value: boolean) {
    store.commit(t.PHOTOSETS__SET_PREFERENCE_IS_DESC, value)
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

  // confirmed() {
  //   this.isReorderingAll = true
  //   this.$nextTick(() => {
  //     this.isConfirming = false
  //   })
  //   this.reorderAll()
  // }

  // canceled() {
  //   this.isConfirming = false
  // }

  // closed() {
  //   this.isReorderingAll = false
  // }

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
