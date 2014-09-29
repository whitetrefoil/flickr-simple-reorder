'use strict'

angular.module 'flickrSimpleReorder'
.controller 'SyncProgressCtrl', [
  '$scope'
  '$modalInstance'
  (
    $scope
    $modalInstance
  ) ->
    # Progress bar

    $scope.total = $scope.orderings.length
    $scope.remaining = $scope.total
    $scope.success = 0
    $scope.fail = 0
    $scope.warning = 0
    $scope.getSuccessStyle = -> {width: "#{$scope.success / $scope.total * 100}%"}
    $scope.getFailStyle = -> {width: "#{$scope.fail / $scope.total * 100}%"}
    $scope.getWarningStyle = -> {width: "#{$scope.warning / $scope.total * 100}%"}

    failedPhotosets = []

    _.map $scope.orderings, (ordering) ->
      ordering.then (result) ->
        switch result
          when 'skipped', 'warning'
            $scope.warning += 1
          else
            $scope.success += 1
      .catch (photoset) ->
        $scope.fail += 1
        failedPhotosets.push photoset
      .finally ->
        $scope.remaining -= 1


    # Window styles

    $scope.getModalClass = ->
      if $scope.remaining > 0
        'modal-info'
      else
        if $scope.fail > 0
          'modal-danger'
        else if $scope.warning is $scope.total
          'modal-warning'
        else
          'modal-success'

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
