interface IInternalStorageContent {
  'flickrSimpleReorder-temp-t': string
  'flickrSimpleReorder-temp-f': string
  'flickrSimpleReorder-temp-o': boolean
}

interface IStorageContent {
  token: string
  orderBy: 'datetaken' | 'dateupload' | 'title' | 'views'
  isDesc: boolean
}

interface IStorage {
  set<K extends keyof IInternalStorageContent>(
    key: K,
    value: IInternalStorageContent[K],
    expiration?: number | Date,
  ): void
  get<K extends keyof IInternalStorageContent>(key: K): IInternalStorageContent[K]
  remove<K extends keyof IInternalStorageContent>(key: K): void
  clearAll(): void
  addPlugin(plugin: any): void
}

const SEVEN_DAYS_AS_MS = 7 * 24 * 60 * 60 * 1000

const storage = require('store') as IStorage
storage.addPlugin(require('store/plugins/expire'))

export default class Storage {
  static set<K extends keyof IStorageContent>(key: K, value: IStorageContent[K]): void {
    switch (key) {
      case 'token':
        storage.set('flickrSimpleReorder-temp-t', value as string, Date.now() + SEVEN_DAYS_AS_MS)
        break
      case 'orderBy':
        storage.set('flickrSimpleReorder-temp-f', value as 'datetaken' | 'dateupload' | 'title' | 'views')
        break
      case 'isDesc':
        storage.set('flickrSimpleReorder-temp-o', value as boolean)
        break
      default:
      // Do nothing
    }
  }

  static get<K extends keyof IStorageContent>(key: K): IStorageContent[K] {
    switch (key) {
      case 'token':
        return storage.get('flickrSimpleReorder-temp-t')
      case 'orderBy':
        return storage.get('flickrSimpleReorder-temp-f')
      case 'isDesc':
        return storage.get('flickrSimpleReorder-temp-o')
      default:
        return null
    }
  }

  static remove<K extends keyof IStorageContent>(key: K): void {
    switch (key) {
      case 'token':
        storage.remove('flickrSimpleReorder-temp-t')
        break
      default:
        // Do nothing
    }
  }
}
