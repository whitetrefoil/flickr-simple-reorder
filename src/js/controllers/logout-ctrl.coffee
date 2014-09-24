'use strict'

angular.module 'flickrSimpleReorder'
.controller 'LogoutCtrl', [
  '$scope'
  '$state'
  'Auth'
  (
    $scope
    $state
    Auth
  ) ->

    Auth.clearAuth()

    $scope.isExpired = $state.params.isExpired

    if $state.params.isSilent
      $state.go 'login', {inherit: false}

]
