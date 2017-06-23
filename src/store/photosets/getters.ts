import * as _              from 'lodash'
import { IPhotosetsState, IPhotosetWithStatus } from './state'

function photosetWithStatus(state: IPhotosetsState): IPhotosetWithStatus[] {
  const photosets = state.photosets
  const statuses = state.statuses
  const ids = _.map(photosets, _.property('id'))
  return _.map(ids, (id) => {
    const photoset = _.find(photosets, _.matchesProperty('id', id))
    const status = _.find(statuses, _.matchesProperty('id', id))
    return _.assign({}, photoset, status)
  })
}

export const getters = {
  photosetWithStatus,
}
