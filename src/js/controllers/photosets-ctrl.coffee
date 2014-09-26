'use strict'

angular.module 'flickrSimpleReorder'
.controller 'PhotosetsCtrl', [
  '$scope'
  '$rootScope'
  '$modal'
  'Photosets'
  'user'
  (
    $scope
    $rootScope
    $modal
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
        photoset
      .catch ->
        photoset.state = 'failed'
        photoset

    $scope.reorderAll = (photosets = $scope.photosets)->
      orderings = _.map photosets, (photoset) -> $scope.reorder photoset
      modalScope = $rootScope.$new()
      modalScope.orderings = orderings
      $modal.open
        scope: modalScope
        templateUrl: 'tpls/sync-progress.html'
        backdrop: 'static'
        keyboard: false
        windowClass: 'modal-sync-progress'
        controller: 'SyncProgressCtrl'
      .result.catch (failedPhotosets) ->
        $scope.reorderAll(failedPhotosets)

    getList()

    $scope.$watch 'isFilterEnabled', -> filter()
    $scope.$watch 'filterString', (val) ->
      $scope.isFilterEnabled = !_.isEmpty(val)
      filter()

    $scope.perPage = 12
    $scope.maxSize = 5
    $scope.page = 1
]
