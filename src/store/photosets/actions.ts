import * as _                         from 'lodash'
import { ActionContext }              from 'vuex'
import { request }                    from '../../services/api'
import { getLogger }                  from '../../services/log'
import { apiKey, composeFormData }    from '../helpers'
import { IRootState }                 from '../state'
import * as t                         from '../types'
import { IPhotoset, IPhotosetsState } from './state'

export type IPhotosetsActionContext = ActionContext<IPhotosetsState, IRootState>

const { debug } = getLogger('/store/photosets/actions.ts')

const methods = {
  getList      : 'flickr.photosets.getList',
  getPhotos    : 'flickr.photosets.getPhotos',
  reorderPhotos: 'flickr.photosets.reorderPhotos',
}

const PHOTOS_PER_PAGE = 500


interface IPhotosetsGetListResponse {
  data: {
    photosets: {
      photoset: {
        id: string,
        photos: number,
        primary_photo_extras: {
          url_m: string,
          height_m: string,
          width_m: string,
        },
        title: {
          _content: string,
        },
      }[],
    },
  },
}

interface IPhoto {
  id: string,
  title: string,
  datetaken: string,
  dateupload: string,
  views: string,
}

interface IPhotosetsGetPhotosResponse {
  data: {
    photoset: {
      photo: IPhoto[],
    },
  },
}


function order(photos: IPhoto[], state: IPhotosetsState): IPhoto[] {
  const orderBy = state.preferences.orderBy
  const isDesc  = state.preferences.isDesc
  const sorted  = _.orderBy(photos, [_.property(orderBy)], [isDesc ? 'desc' : 'asc']) as IPhoto[]
  debug(sorted)
  return sorted
}


export const actions = {
  async [t.PHOTOSETS__GET_LIST]({ commit, rootState }: IPhotosetsActionContext): Promise<void> {
    debug('Get photosets')

    const data = composeFormData({
      primary_photo_extras: 'url_m',
      api_key             : apiKey,
      method              : methods.getList,
      auth_token          : rootState.login.token,
    })

    const photosets: IPhotoset[] = []

    debug('Start requesting photoset list.')
    const res = await request(data) as IPhotosetsGetListResponse
    debug('Done requesting photoset list.')

    _.forEach(res.data.photosets.photoset, (p) => {
      const photoset: IPhotoset = {
        id      : p.id,
        photos  : p.photos,
        title   : p.title._content,
        url_m   : p.primary_photo_extras.url_m,
        height_m: parseInt(p.primary_photo_extras.height_m, 10),
        width_m : parseInt(p.primary_photo_extras.width_m, 10),
        status  : null,
      }

      photosets.push(photoset)
    })

    commit(t.PHOTOSETS__SET_LIST, photosets)
  },

  async [t.PHOTOSETS__ORDER_SET](
    { commit, state, rootState }: IPhotosetsActionContext,
    photoset: IPhotoset,
  ): Promise<void> {
    debug('Order set')

    commit(t.PHOTOSETS__SET_STATUS, { id: photoset.id, status: 'processing' })


    let photos: IPhoto[] = []

    const pages = Math.ceil(photoset.photos / PHOTOS_PER_PAGE)

    debug(`There are ${photoset.photos} photos in photoset "${photoset.title}", which needs ${pages} request(s) to fetch all photos.`)

    debug('Start requesting photos.')
    for (let p = 0; p < pages; p++) {
      const data = composeFormData({
        api_key    : apiKey,
        method     : methods.getPhotos,
        auth_token : rootState.login.token,
        photoset_id: photoset.id,
        page       : 0,
        per_page   : PHOTOS_PER_PAGE,
        extras     : 'date_upload,date_taken,views',
      })

      try {
        const res = await request(data) as IPhotosetsGetPhotosResponse
        photos    = photos.concat(res.data.photoset.photo)
      } catch (e) {
        debug('Failed to request photos!', e)
        commit(t.PHOTOSETS__SET_STATUS, { id: photoset.id, status: 'error' })
        return
      }
    }
    debug('Done requesting photos.')

    const sortedPhotos = order(photos, state)
    const photoIds     = _.map(sortedPhotos, _.property('id')).join(',')
    debug(photoIds)

    const data = composeFormData({
      api_key    : apiKey,
      method     : methods.reorderPhotos,
      auth_token : rootState.login.token,
      photoset_id: photoset.id,
      photo_ids  : photoIds,
    })

    try {
      await request(data)
    } catch (e) {
      debug('Failed to reorder photos!', e)
      commit(t.PHOTOSETS__SET_STATUS, { id: photoset.id, status: 'error' })
      return
    }
    commit(t.PHOTOSETS__SET_STATUS, { id: photoset.id, status: 'done' })
  },
}
