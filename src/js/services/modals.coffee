'use strict'

angular.module 'flickrSimpleReorder'
.factory 'Modals', [
  '$modal'
  '$rootScope'
  (
    $modal
    $rootScope
  ) ->
    modal: (args = {}, params = {}) ->
      $scope = $rootScope.$new()
      _.extend $scope, args
      modalParams =
        scope: $scope
        backdrop: 'static'
      _.extend modalParams, params
      $modal.open(modalParams).result

    reorderAllConfirm: (args = {}, params = {}) ->
      @modal args, _.extend params,
        templateUrl: 'tpls/confirm-reorder-all-modal.html'
        controller: 'ConfirmReorderAllModalCtrl'

    syncProgress: (args = {}, params = {}) ->
      @modal args, _.extend params,
        templateUrl: 'tpls/sync-progress.html'
        windowClass: 'modal-sync-progress'
        controller: 'SyncProgressCtrl'

]
