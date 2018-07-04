import { getLogger }               from '@whitetrefoil/debug-log'
import { EventEmitter }            from 'events'
import * as _                      from 'lodash'
import { ActionTree }              from 'vuex'
import { getPhotosetList }         from '../../api/get-photoset-list'
import { postPhotosetBulkReorder } from '../../api/post-photoset-bulk-reorder'
import { postPhotosetReorder }     from '../../api/post-photoset-reorder'
import * as API                    from '../../api/types/api'
import { IRootState }              from '../state'
import * as t                      from '../types'
import { IPhotosetsState }         from './state'


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

interface IGetListPayload extends API.IGetPhotosetListRequest {
  type: typeof t.PHOTOSETS__GET_LIST
}

interface IOrderSetPayload extends API.IPostPhotosetReorderRequest {
  type: typeof t.PHOTOSETS__ORDER_SET
}

interface IBulkOrderSetPayload extends API.IPostPhotosetBulkReorderRequest {
  type: typeof t.PHOTOSETS__BULK_ORDER_SET
}


export type IPhotosetsDispatchPayload =
  |IGetListPayload
  |IOrderSetPayload


const { debug } = getLogger(`/src/${__filename.split('?')[0]}`)


export const actions: ActionTree<IPhotosetsState, IRootState> = {
  async [t.PHOTOSETS__GET_LIST]({ commit }, payload: IGetListPayload) {
    debug('Get photosets')

    const photosets = await getPhotosetList(payload.token, payload.secret, payload.nsid)

    commit(t.PHOTOSETS__SET_LIST, photosets.data.photosets)
  },

  async [t.PHOTOSETS__ORDER_SET]({ commit }, payload: IOrderSetPayload) {
    debug(`Reorder photoset ${payload.setId}`)

    commit(t.PHOTOSETS__SET_STATUS, {
      id    : payload.setId,
      status: 'processing',
    })

    try {
      const result = await postPhotosetReorder(
        payload.nsid,
        payload.setId,
        payload.orderBy,
        payload.isDesc,
        payload.token,
        payload.secret,
      )

      if (result.data.result.isSuccessful !== true) {
        commit(t.PHOTOSETS__SET_STATUS, {
          id    : payload.setId,
          status: 'error',
        })
        return
      }

      if (result.data.result.isSkipped === true) {
        commit(t.PHOTOSETS__SET_STATUS, {
          id    : payload.setId,
          status: 'skipped',
        })
        return
      }

      commit(t.PHOTOSETS__SET_STATUS, {
        id    : payload.setId,
        status: 'done',
      })
    } catch (e) {
      commit(t.PHOTOSETS__SET_STATUS, {
        id    : payload.setId,
        status: 'error',
      })
    }
  },

  [t.PHOTOSETS__BULK_ORDER_SET]({ commit, state }, payload: IBulkOrderSetPayload): BulkReorderProgressEmitter {

    const emitter = new BulkReorderProgressEmitter()

    _.forEach(payload.setIds, (id) => {
      commit(t.PHOTOSETS__SET_STATUS, { id, status: 'processing' })
    })

    let streamIndex = 0

    postPhotosetBulkReorder(
      payload.nsid,
      payload.setIds,
      payload.orderBy,
      payload.isDesc,
      payload.token,
      payload.secret,
    )
      .on('progress', (progress: ProgressEvent) => {
        const xhr = progress.target as XMLHttpRequest
        const txt = xhr.responseText

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
