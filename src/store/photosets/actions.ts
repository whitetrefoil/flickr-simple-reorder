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
  getList: 'flickr.photosets.getList',
}


interface IPhotosetsGetListResponse {
  data: {
    photosets: {
      photoset: {
        id: string,
        photos: number,
        primary_photo_extras: {
          url_q: string,
        },
        title: {
          _content: string,
        },
      }[],
    },
  },
}


export const actions = {
  async [t.PHOTOSETS__GET_LIST]({ commit, rootState }: IPhotosetsActionContext): Promise<void> {
    debug('Get photosets')

    const data = composeFormData({
      primary_photo_extras: 'url_q',
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
        id    : p.id,
        photos: p.photos,
        title : p.title._content,
        url_q : p.primary_photo_extras.url_q,
      }

      photosets.push(photoset)
    })

    commit(t.PHOTOSETS__SET_LIST, photosets)
  },
}
