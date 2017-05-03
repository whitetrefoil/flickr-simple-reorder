interface IInternalStorageContent {
  'flickrSimpleReorder-temp-t': string
}

interface IStorageContent {
  token: string
}

interface IStorage {
  set<K extends keyof IInternalStorageContent>(
    key: K,
    value: IInternalStorageContent[K],
    expiration: number | Date,
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
      default:
      // Do nothing
    }
  }

  static get<K extends keyof IStorageContent>(key: K): IStorageContent[K] {
    switch (key) {
      case 'token':
        return storage.get('flickrSimpleReorder-temp-t')
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
