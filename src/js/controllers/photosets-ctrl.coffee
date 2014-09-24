'use strict'

angular.module 'flickrSimpleReorder'
.controller 'PhotosetsCtrl', [
  '$scope'
  'Photosets'
  ($scope, Photosets) ->
    getList = ->
      Photosets.getList($scope.page).then (data) ->
        $scope.photosets = data.photoset
        $scope.totalPhotosets = data.total
        $scope.photosetsPerPage = parseInt data.perpage, 10

    $scope.$watch 'page', -> getList()

    $scope.maxSize = 5
    $scope.page = 1
]
