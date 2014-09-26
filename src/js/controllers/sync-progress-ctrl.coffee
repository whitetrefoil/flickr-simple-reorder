'use strict'

angular.module 'flickrSimpleReorder'
.controller 'SyncProgressCtrl', [
  '$scope'
  '$modalInstance'
  '$q'
  (
    $scope
    $modalInstance
    $q
  ) ->
    # Progress bar
    $scope.total = $scope.orderings.length
    $scope.remaining = $scope.total
    $scope.success = 0
    $scope.successStyle =
      width: '0%'
    $scope.fail = 0
    $scope.failStyle =
      width: '0%'
    $scope.warning = 0
    $scope.warningStyle =
      width: '0%'

    failedPhotosets = []

    _.map $scope.orderings, (ordering) ->
      ordering.then ->
        $scope.success += 1
        $scope.successStyle.width = "#{$scope.success / $scope.total * 100}%"
        $scope.remaining -= 1
      .catch (photoset) ->
        $scope.fail += 1
        $scope.failStyle.width = "#{$scope.fail / $scope.total * 100}%"
        $scope.remaining -= 1
        failedPhotosets.push photoset

    # Buttons
    close = -> $modalInstance.close
      total: $scope.total
      success: $scope.success
      fail: $scope.fail
    $scope.close = close
    $scope.abandon = close
    $scope.retry = ->
      $modalInstance.dismiss(failedPhotosets)

]
