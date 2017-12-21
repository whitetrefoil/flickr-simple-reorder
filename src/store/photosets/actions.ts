import { EventEmitter }            from 'eventemitter3'
import * as _                      from 'lodash'
import { ActionContext }           from 'vuex'
import { getPhotosetList }         from '../../api/get-photoset-list'
import { postPhotosetBulkReorder } from '../../api/post-photoset-bulk-reorder'
import { postPhotosetReorder }     from '../../api/post-photoset-reorder'
import * as API                    from '../../api/types/api'
import { getLogger }               from '../../services/log'
import { IRootState }              from '../state'
import * as t                      from '../types'
import { IPhotosetsState }         from './state'

export type IPhotosetsActionContext = ActionContext<IPhotosetsState, IRootState>

const { debug } = getLogger('/store/photosets/actions.ts')

export type BulkReorderProgressEvent = 'success'|'fail'|'skip'

export class BulkReorderProgressEmitter extends EventEmitter {
  emit(event: 'finish'): boolean
  emit(event: BulkReorderProgressEvent, id: string): boolean
  emit(event: string, id?: string): boolean {
    return super.emit(event, id)
  }

  on(event: 'finish', listener: () => void): this
  on(event: BulkReorderProgressEvent, listener: (id: string) => void): this
  on(event: string, listener: (...args: any[]) => void): this {
    return super.on(event, listener)
  }
}

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

  [t.PHOTOSETS__BULK_ORDER_SET](
    { commit, state }: IPhotosetsActionContext,
    params: API.IPostPhotosetBulkReorderRequest,
  ): BulkReorderProgressEmitter {

    const emitter = new BulkReorderProgressEmitter()

    _.forEach(params.setIds, (id) => {
      commit(t.PHOTOSETS__SET_STATUS, { id, status: 'processing' })
    })

    let streamIndex = 0

    postPhotosetBulkReorder(
      params.nsid,
      params.setIds,
      params.orderBy,
      params.isDesc,
      params.token,
      params.secret,
    )
      .on('progress', (progress: ProgressEvent) => {
        const xhr      = progress.target as XMLHttpRequest
        const txt      = xhr.responseText

        if (_.isEmpty(txt)) { return }

        const newIndex = _.lastIndexOf(txt, ',') + 1
        const newTxt   = txt.substring(streamIndex, newIndex - 1)

        _.forEach(newTxt.split(','), (item) => {
          const split = item.split(':')
          switch (split[1]) {
            case 's':
              emitter.emit('success', split[0])
              commit(t.PHOTOSETS__SET_STATUS, {
                id    : split[0],
                status: 'done',
              })
              break
            case 'f':
              emitter.emit('fail', split[0])
              commit(t.PHOTOSETS__SET_STATUS, {
                id    : split[0],
                status: 'error',
              })
              break
            case 'k':
              emitter.emit('skip', split[0])
              commit(t.PHOTOSETS__SET_STATUS, {
                id    : split[0],
                status: 'skipped',
              })
              break
            default: // Do nothing ~
          }
        })
        streamIndex = newIndex
      })

      .end(() => {
        emitter.emit('finish')
      })

    return emitter
  },
}
