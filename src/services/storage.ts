import { getLogger } from '@whitetrefoil/debug-log'
import { isEmpty }   from 'lodash'
import * as API      from '../api/types/api'
import { compare }   from './version'


interface ICache {
  k: string|undefined
  s: string|undefined
  t: string|undefined
  u: API.IUser|undefined
}

interface IPreferences {
  f: API.IOrderByOption
  o: boolean
}

interface IInternalStorageContent {
  'flickrSimpleReorder-version': string
  'flickrSimpleReorder-cache': ICache
  'flickrSimpleReorder-pref': IPreferences
}

export interface IStorageContent {
  version: string
  cache: ICache
  preferences: IPreferences
}

interface IStorage {
  set<K extends keyof IInternalStorageContent>(
    key: K,
    value: IInternalStorageContent[K],
    expiration?: number|Date,
  ): void

  get<K extends keyof IInternalStorageContent>(key: K): IInternalStorageContent[K]

  remove<K extends keyof IInternalStorageContent>(key: K): void

  clearAll(): void

  addPlugin(plugin: any): void
}


const { debug } = getLogger(`/src/${__filename.split('?')[0]}`)

const SEVEN_DAYS_AS_MS = 7 * 24 * 60 * 60 * 1000

const version = process.env.VERSION || '0.0.0'

const storage = require('store') as IStorage
storage.addPlugin(require('store/plugins/expire'))

const sessionVersion = storage.get('flickrSimpleReorder-version') || '0.0.0'

debug('Detected session for version:', sessionVersion)
debug('Current version:', process.env.VERSION)

if (isEmpty(sessionVersion) || compare(sessionVersion, version) < 0) {
  storage.clearAll()
}
storage.set('flickrSimpleReorder-version', version)

export default {
  set<K extends keyof IStorageContent>(key: K, value: IStorageContent[K]): void {
    switch (key) {
      case 'cache':
        storage.set('flickrSimpleReorder-cache', value as ICache, Date.now() + SEVEN_DAYS_AS_MS)
        break
      case 'preferences':
        storage.set('flickrSimpleReorder-pref', value as IPreferences)
        break
      default:
      // Do nothing
    }
  },

  get<K extends keyof IStorageContent>(key: K): IStorageContent[K]|undefined {
    switch (key) {
      case 'cache':
        return storage.get('flickrSimpleReorder-cache')
      case 'preferences':
        return storage.get('flickrSimpleReorder-pref')
      default:
        return undefined
    }
  },

  remove<K extends keyof IStorageContent>(key: K): void {
    switch (key) {
      case 'cache':
        storage.remove('flickrSimpleReorder-cache')
        break
      default:
      // Do nothing
    }
  },
}
