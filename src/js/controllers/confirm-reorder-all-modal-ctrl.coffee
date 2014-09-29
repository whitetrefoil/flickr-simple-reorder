'use strict'

angular.module 'flickrSimpleReorder'
.controller 'ConfirmReorderAllModalCtrl', [
  '$scope'
  '$modalInstance'
  (
    $scope
    $modalInstance
  ) ->

    $scope.yes = ->
      $modalInstance.close()

    $scope.no = ->
      $modalInstance.dismiss()

]
