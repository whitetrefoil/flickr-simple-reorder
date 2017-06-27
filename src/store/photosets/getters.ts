// import * as _                                   from 'lodash'
// import * as t                                   from '../types'
// import { IPhotosetsState, IPhotosetWithStatus } from './state'
//
// function photosetWithStatus(state: IPhotosetsState): IPhotosetWithStatus[] {
//   const ids = _.map(state.photosets, _.property('id')) as string[]
//   return _.map(ids, (id) => {
//     const photoset = _.find(state.photosets, _.matchesProperty('id', id))
//
//     const status = state.statuses[id]
//
//     return _.assign({}, photoset, { status })
//   })
// }
//
// export const getters = {
//   [t.PHOTOSETS__PHOTOSETS_WITH_STATUS]: photosetWithStatus,
// }
