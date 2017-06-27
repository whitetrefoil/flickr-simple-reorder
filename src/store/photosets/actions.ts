import { ActionContext }       from 'vuex'
import { getPhotosetList }     from '../../api/get-photoset-list'
import { postPhotosetReorder } from '../../api/post-photoset-reorder'
import * as API                from '../../api/types/api'
import { getLogger }           from '../../services/log'
import { IRootState }          from '../state'
import * as t                  from '../types'
import { IPhotosetsState }     from './state'

export type IPhotosetsActionContext = ActionContext<IPhotosetsState, IRootState>

const { debug } = getLogger('/store/photosets/actions.ts')


export const actions = {
  async [t.PHOTOSETS__GET_LIST](
    { commit }: IPhotosetsActionContext,
    params: API.IGetPhotosetListRequest,
  ): Promise<void> {
    debug('Get photosets')

    const photosets = await getPhotosetList(params.token, params.secret, params.nsid)

    commit(t.PHOTOSETS__SET_LIST, photosets.data.photosets)
  },

  async [t.PHOTOSETS__ORDER_SET](
    { commit, state }: IPhotosetsActionContext,
    params: API.IPostPhotosetReorderRequest,
  ): Promise<void> {
    debug(`Reorder photoset ${params.setId}`)

    commit(t.PHOTOSETS__SET_STATUS, {
      id    : params.setId,
      status: 'processing',
    })

    try {
      const result = await postPhotosetReorder(
        params.nsid,
        params.setId,
        params.orderBy,
        params.isDesc,
        params.token,
        params.secret,
      )

      if (result.data.result.isSuccessful !== true) {
        commit(t.PHOTOSETS__SET_STATUS, {
          id    : params.setId,
          status: 'error',
        })
        return
      }

      if (result.data.result.isSkipped === true) {
        commit(t.PHOTOSETS__SET_STATUS, {
          id    : params.setId,
          status: 'skipped',
        })
        return
      }

      commit(t.PHOTOSETS__SET_STATUS, {
        id    : params.setId,
        status: 'done',
      })
    } catch (e) {
      commit(t.PHOTOSETS__SET_STATUS, {
        id    : params.setId,
        status: 'error',
      })
    }
  },
}
