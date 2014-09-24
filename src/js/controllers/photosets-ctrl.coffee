'use strict'

angular.module 'flickrSimpleReorder'
.controller 'PhotosetsCtrl', [
  '$scope'
  'Photosets'
  '$log'
  ($scope, Photosets, $log) ->

    Photosets.getList().then (data) ->
      $log.info data
      $scope.photosets = data.photoset

]
