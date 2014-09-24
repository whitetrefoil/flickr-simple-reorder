'use strict'

angular.module 'flickrSimpleReorder'
.controller 'LogoutCtrl', [
  '$state'
  'Auth'
  ($state, Auth) ->

    Auth.clearAuth()

    if $state.params.isSilent
      $state.go 'login', {frob: null}

]
