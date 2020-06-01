import getLogger                    from '@whitetrefoil/log-utils';
import storage                      from 'store';
import expire                       from 'store/plugins/expire';
import type { OrderByOption, User } from '~/interfaces/api';
import { compare }                  from './version';


interface Cache {
  k?: string;
  s?: string;
  t?: string;
  u?: User;
}

interface Preferences {
  f?: OrderByOption;
  o: boolean;
}

interface InternalStorageContent {
  'flickrSimpleReorder-version': string;
  'flickrSimpleReorder-cache': Cache;
  'flickrSimpleReorder-pref': Preferences;
}

export interface StorageContent {
  version: string;
  cache: Cache;
  preferences: Preferences;
}

const { debug } = getLogger(`/src/${__filename.split('?')[0]}`);


const SEVEN_DAYS_AS_MS = 7 * 24 * 60 * 60 * 1000;

const version = process.env.VERSION ?? '0.0.0';

storage.addPlugin(expire);

const sessionVersion = storage.get('flickrSimpleReorder-version') ?? '0.0.0';

debug('Detected session for version:', sessionVersion);
debug('Current version:', process.env.VERSION);

if (sessionVersion == null || sessionVersion === '' || compare(sessionVersion, version) < 0) {
  storage.clearAll();
}
storage.set('flickrSimpleReorder-version', version);


export default {
  set<K extends keyof StorageContent>(key: K, value: StorageContent[K]): void {
    switch (key) {
      case 'cache':
        (storage.set as (key: string, value: any, expire?: number) => any)(
          'flickrSimpleReorder-cache',
          value as Cache,
          Date.now() + SEVEN_DAYS_AS_MS,
        );
        break;
      case 'preferences':
        storage.set('flickrSimpleReorder-pref', value as Preferences);
        break;
      default:
      // Do nothing
    }
  },

  get<K extends keyof StorageContent>(key: K): StorageContent[K]|null {
    switch (key) {
      case 'cache':
        return storage.get('flickrSimpleReorder-cache');
      case 'preferences':
        return storage.get('flickrSimpleReorder-pref');
      default:
        return null;
    }
  },

  remove<K extends keyof StorageContent>(key: K): void {
    switch (key) {
      case 'cache':
        storage.remove('flickrSimpleReorder-cache');
        break;
      default:
      // Do nothing
    }
  },
};
