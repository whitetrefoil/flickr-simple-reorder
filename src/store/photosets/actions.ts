import * as _                                   from 'lodash'
import { ActionContext }                        from 'vuex'
import { getPhotosetList }                      from '../../api/get-photoset-list'
import * as API                                 from '../../api/types/api'
import { getLogger }                            from '../../services/log'
import { IRootState }                           from '../state'
import * as t                                   from '../types'
import { IPhotosetsState, IPhotosetWithStatus } from './state'

export type IPhotosetsActionContext = ActionContext<IPhotosetsState, IRootState>

const { debug } = getLogger('/store/photosets/actions.ts')


export const actions = {
  async [t.PHOTOSETS__GET_LIST]({ commit, rootState }: IPhotosetsActionContext, params: API.IGetPhotosetListRequest): Promise<void> {
    debug('Get photosets')

    const photosets = await getPhotosetList(params.token, params.secret, params.nsid)

    commit(t.PHOTOSETS__SET_LIST, photosets.data.photosets)
  },

  // async [t.PHOTOSETS__ORDER_SET](
  //   { commit, state, rootState }: IPhotosetsActionContext,
  //   photoset: IPhotoset,
  // ): Promise<IPhotosetStatus> {
  //   debug('Order set')
  //
  //   commit(t.PHOTOSETS__SET_STATUS, { id: photoset.id, status: 'processing' })
  //
  //
  //   let photos: IPhoto[] = []
  //
  //   const pages = Math.ceil(photoset.photos / PHOTOS_PER_PAGE)
  //
  //   debug(`There are ${photoset.photos} photos in photoset "${photoset.title}", which needs ${pages} request(s) to fetch all photos.`)
  //
  //   debug('Start requesting photos.')
  //   for (let p = 0; p < pages; p++) {
  //     const data = composeFormData({
  //       api_key    : apiKey,
  //       method     : methods.getPhotos,
  //       auth_token : rootState.login.token,
  //       photoset_id: photoset.id,
  //       page       : p + 1,
  //       per_page   : PHOTOS_PER_PAGE,
  //       extras     : 'date_upload,date_taken,views',
  //     })
  //
  //     try {
  //       const res = await request(data) as IPhotosetsGetPhotosResponse
  //       photos    = photos.concat(res.data.photoset.photo)
  //     } catch (e) {
  //       debug('Failed to request photos!', e)
  //       commit(t.PHOTOSETS__SET_STATUS, { id: photoset.id, status: 'error' })
  //       throw new Error('Failed to reorder photos!')
  //     }
  //   }
  //   debug('Done requesting photos.')
  //
  //   const sortedPhotos = order(photos, state)
  //
  //   if (sortedPhotos === null) {
  //     debug('No need to reorder.')
  //     commit(t.PHOTOSETS__SET_STATUS, { id: photoset.id, status: 'skipped' })
  //     return 'skipped'
  //   }
  //
  //   const photoIds = _.map(sortedPhotos, _.property('id')).join(',')
  //   debug(photoIds)
  //
  //   const data = composeFormData({
  //     api_key    : apiKey,
  //     method     : methods.reorderPhotos,
  //     auth_token : rootState.login.token,
  //     photoset_id: photoset.id,
  //     photo_ids  : photoIds,
  //   })
  //
  //   try {
  //     await request(data)
  //   } catch (e) {
  //     debug('Failed to reorder photos!', e)
  //     commit(t.PHOTOSETS__SET_STATUS, { id: photoset.id, status: 'error' })
  //     throw new Error('Failed to reorder photos!')
  //   }
  //   commit(t.PHOTOSETS__SET_STATUS, { id: photoset.id, status: 'done' })
  //   return 'done'
  // },
}
