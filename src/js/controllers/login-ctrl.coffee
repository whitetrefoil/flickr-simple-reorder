'use strict'

angular.module 'flickrSimpleReorder'
.controller 'LoginCtrl', [
  '$state'
  'Auth'
  '$log'
  '$scope'
  (
    $state
    Auth
    $log
    $scope
  ) ->

    if _.isEmpty($state.params.frob)
      $scope.isAuthenticating = false
      $scope.authUrl = Auth.authUrl()
      $scope.isFrobInvalid = $state.params.isFrobInvalid
    else
      $scope.isAuthenticating = true
      Auth.getToken($state.params.frob)
      .then ->
        $state.go 'photosets'
]
