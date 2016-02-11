'use strict'

angular.module 'flickrSimpleReorder'
.controller 'ConfirmReorderAllModalCtrl', [
  '$scope'
  '$uibModalInstance'
  (
    $scope
    $uibModalInstance
  ) ->

    $scope.yes = ->
      $uibModalInstance.close()

    $scope.no = ->
      $uibModalInstance.dismiss()

]
