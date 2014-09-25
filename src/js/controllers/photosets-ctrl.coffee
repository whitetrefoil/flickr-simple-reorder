'use strict'

angular.module 'flickrSimpleReorder'
.controller 'PhotosetsCtrl', [
  '$scope'
  'Photosets'
  'user'
  (
    $scope
    Photosets
    user
  ) ->
    getList = ->
      Photosets.getList(user.nsid).then (data) ->
        $scope.photosets = data.photoset
        $scope.totalPhotosets = $scope.photosets.length

    $scope.reorder = (photoset) ->
      photoset.state = 'reordering'
      Photosets.getPhotos photoset.id, parseInt(photoset.photos, 10)
      .then (photos) ->
        ids = _(photos)
        .sortBy (photo) -> parseInt(photo.dateupload, 10) * -1
        .map 'id'
        .value()
        photoset.state = 'syncing'
        Photosets.reorderPhotos photoset.id, ids
      .then ->
        photoset.state = null
      .catch ->
        photoset.state = 'failed'

    getList()

    $scope.perPage = 10
    $scope.maxSize = 5
    $scope.page = 1
]
