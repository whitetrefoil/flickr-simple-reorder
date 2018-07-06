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
import { IPhotosetsCommitPayload } from './mutations'
import { IPhotosetsState, Status } from './state'


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
  needLongTimeout?: boolean
}

interface IBulkOrderSetPayload extends API.IPostPhotosetBulkReorderRequest {
  type: typeof t.PHOTOSETS__BULK_ORDER_SET
}


export type IPhotosetsDispatchPayload =
  |IGetListPayload
  |IOrderSetPayload
  |IBulkOrderSetPayload


const { debug } = getLogger(`/src/${__filename.split('?')[0]}`)


export const actions: ActionTree<IPhotosetsState, IRootState> = {
  async [t.PHOTOSETS__GET_LIST]({ commit }, payload: IGetListPayload) {
    debug('Get photosets')

    const photosets = await getPhotosetList(payload.token, payload.secret, payload.nsid)

    commit<IPhotosetsCommitPayload>({
      type     : t.PHOTOSETS__SET_LIST,
      photosets: photosets.photosets,
    })
  },

  async [t.PHOTOSETS__ORDER_SET]({ commit }, payload: IOrderSetPayload) {
    debug(`Reorder photoset ${payload.setId}`)

    commit<IPhotosetsCommitPayload>({
      type  : t.PHOTOSETS__SET_STATUS,
      id    : payload.setId,
      status: Status.Processing,
    })

    try {
      const result = await postPhotosetReorder(
        payload.nsid,
        payload.setId,
        payload.orderBy,
        payload.isDesc,
        payload.token,
        payload.secret,
        payload.needLongTimeout,
      )

      debug(result)

      if (result.result.isSuccessful !== true) {
        commit<IPhotosetsCommitPayload>({
          type  : t.PHOTOSETS__SET_STATUS,
          id    : payload.setId,
          status: Status.Error,
        })
        return
      }

      if (result.result.isSkipped === true) {
        commit<IPhotosetsCommitPayload>({
          type  : t.PHOTOSETS__SET_STATUS,
          id    : payload.setId,
          status: Status.Skipped,
        })
        return
      }

      commit<IPhotosetsCommitPayload>({
        type  : t.PHOTOSETS__SET_STATUS,
        id    : payload.setId,
        status: Status.Done,
      })
    } catch (e) {
      commit<IPhotosetsCommitPayload>({
        type  : t.PHOTOSETS__SET_STATUS,
        id    : payload.setId,
        status: Status.Error,
      })
    }
  },

  [t.PHOTOSETS__BULK_ORDER_SET]({ commit, state }, payload: IBulkOrderSetPayload): BulkReorderProgressEmitter {

    const emitter = new BulkReorderProgressEmitter()

    _.forEach(payload.setIds, (id) => {
      commit<IPhotosetsCommitPayload>({
        type  : t.PHOTOSETS__SET_STATUS,
        id,
        status: Status.Processing,
      })
    })

    let streamIndex = 0

    postPhotosetBulkReorder(
      payload.nsid,
      payload.setIds,
      payload.orderBy,
      payload.isDesc,
      payload.token,
      payload.secret,
      (progress: ProgressEvent) => {
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
              commit<IPhotosetsCommitPayload>({
                type  : t.PHOTOSETS__SET_STATUS,
                id    : split[0],
                status: Status.Done,
              })
              break
            case 'f':
              emitter.emit('fail', split[0])
              commit<IPhotosetsCommitPayload>({
                type  : t.PHOTOSETS__SET_STATUS,
                id    : split[0],
                status: Status.Error,
              })
              break
            case 'k':
              emitter.emit('skip', split[0])
              commit<IPhotosetsCommitPayload>({
                type  : t.PHOTOSETS__SET_STATUS,
                id    : split[0],
                status: Status.Skipped,
              })
              break
            default: // Do nothing ~
          }
        })
        streamIndex = newIndex
      },
    )
      .then(() => {
        emitter.emit('finish')
      })

    return emitter
  },
}
