'use strict'

angular.module 'flickrSimpleReorder'
.factory 'Modals', [
  '$modal'
  '$rootScope'
  (
    $modal
    $rootScope
  ) ->
    reorderAllConfirm: (args = {}, params = {}) ->
      $scope = $rootScope.$new()
      _.extend $scope, args
      modalParams =
        templateUrl: 'tpls/confirm-reorder-all-modal.html'
        scope: $scope
        backdrop: 'static'
        controller: 'ConfirmReorderAllModalCtrl'
      _.extend modalParams, params
      $modal.open(modalParams).result

]
