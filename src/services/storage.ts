interface IInternalStorageContent {
  'flickrSimpleReorder-temp-t': string
  'flickrSimpleReorder-temp-e': number
}

interface IStorageContent {
  token: string
  usid: number
}

interface IStorage {
  set<K extends keyof IInternalStorageContent>(key: K, value: IInternalStorageContent[K]): void
  get<K extends keyof IInternalStorageContent>(key: K): IInternalStorageContent[K]
  remove<K extends keyof IInternalStorageContent>(key: K): void
  clearAll(): void
  addPlugin(plugin: any): void
}

const WrongStorageKeyError = new Error()

const storage = require('store') as IStorage
// TODO
// storage.addPlugin(require('store/plugins/expire'))

export class Storage {
  static set<K extends keyof IStorageContent>(key: K, value: IStorageContent[K]): void {
    switch (key) {
      case 'token':
        storage.set('flickrSimpleReorder-temp-t', value as string)
        break
      case 'usid':
        storage.set('flickrSimpleReorder-temp-e', value as number)
        break
      default:
        throw WrongStorageKeyError
    }
  }

  static get<K extends keyof IStorageContent>(key: K): IStorageContent[K] {
    switch (key) {
      case 'token':
        return storage.get('flickrSimpleReorder-temp-t')
      case 'usid':
        return storage.get('flickrSimpleReorder-temp-e')
      default:
        throw WrongStorageKeyError
    }
  }
}
