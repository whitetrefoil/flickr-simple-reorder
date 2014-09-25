'use strict'

angular.module 'flickrSimpleReorder'
.controller 'LoginCtrl', [
  '$state'
  'Auth'
  '$scope'
  '$window'
  (
    $state
    Auth
    $scope
    $window
  ) ->

    $scope.authUrl = Auth.authUrl()

    if ($state.params.isFrobInvalid)
      $scope.state = 'invalid'
    else if _.isEmpty($state.params.frob)
      $scope.state = 'redirecting'
      $window.location.href = $scope.authUrl
    else
      $scope.state = 'verifying'
      Auth.getToken($state.params.frob)
      .then ->
        $state.go 'photosets'
]
