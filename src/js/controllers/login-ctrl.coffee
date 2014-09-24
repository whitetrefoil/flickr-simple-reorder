'use strict'

angular.module 'flickrSimpleReorder'
.controller 'LoginCtrl', [
  '$state'
  'Auth'
  '$log'
  '$scope'
  ($state, Auth, $log, $scope) ->

    if _.isEmpty($state.params.frob)
      $scope.isAuthenticating = false
      $scope.authUrl = Auth.authUrl()
    else
      $scope.isAuthenticating = true
      Auth.getToken($state.params.frob).then (res) ->
        if res.data.stat isnt 'ok'
          $state.go 'login', {frob: null}
        else
          Auth.setAuth res.data.auth
          $state.go 'photosets'
]
