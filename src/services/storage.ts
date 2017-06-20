import * as API    from '../api/types/api'
import { isEmpty } from 'lodash'
import * as semver from 'semver'

interface IInternalStorageContent {
  'flickrSimpleReorder-version': string
  'flickrSimpleReorder-temp-t': string
  'flickrSimpleReorder-temp-s': string
  'flickrSimpleReorder-temp-f': API.IOrderByOption
  'flickrSimpleReorder-temp-o': boolean
}

export interface IStorageContent {
  version: string
  token: API.IToken
  orderBy: API.IOrderByOption
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

const sessionVersion = storage.get('flickrSimpleReorder-version')
if (isEmpty(sessionVersion) || semver.lt(sessionVersion, process.env.VERSION)) {
  storage.clearAll()
}
storage.set('flickrSimpleReorder-version', process.env.VERSION)

export default class Storage {
  static set<K extends keyof IStorageContent>(key: K, value: IStorageContent[K]): void {
    switch (key) {
      case 'token':
        storage.set('flickrSimpleReorder-temp-t', (value as API.IToken).key, Date.now() + SEVEN_DAYS_AS_MS)
        storage.set('flickrSimpleReorder-temp-s', (value as API.IToken).secret, Date.now() + SEVEN_DAYS_AS_MS)
        break
      case 'orderBy':
        storage.set('flickrSimpleReorder-temp-f', value as API.IOrderByOption)
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
        return {
          key   : storage.get('flickrSimpleReorder-temp-t'),
          secret: storage.get('flickrSimpleReorder-temp-s'),
        }
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
        // Token & secret will be deleted together.
        storage.remove('flickrSimpleReorder-temp-t')
        storage.remove('flickrSimpleReorder-temp-s')
        break
      default:
      // Do nothing
    }
  }
}
