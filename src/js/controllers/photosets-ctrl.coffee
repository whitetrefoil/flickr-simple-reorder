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
    photosets = []

    filter = ->
      $scope.photosets = if $scope.isFilterEnabled and !_.isEmpty($scope.filterString)
        photosets.filter (photoset) ->
          photoset.title._content.indexOf($scope.filterString) >= 0
      else
        photosets
      $scope.totalPhotosets = $scope.photosets.length

    getList = ->
      Photosets.getList(user.nsid).then (data) ->
        photosets = data.photoset
        filter()

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
        photoset.state = 'done'
      .catch ->
        photoset.state = 'failed'

    getList()

    $scope.$watch 'isFilterEnabled', -> filter()
    $scope.$watch 'filterString', ->
      $scope.isFilterEnabled = true
      filter()

    $scope.perPage = 12
    $scope.maxSize = 5
    $scope.page = 1
]
