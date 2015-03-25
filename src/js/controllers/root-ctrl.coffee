'use strict'

angular.module 'flickrSimpleReorder'
.controller 'RootCtrl', [
  '$rootScope'
  '$location'
  '$state'
  'People'
  (
    $rootScope
    $location
    $state
    People
  ) ->
    iconUrl = 'http://farm<%=farm%>.staticflickr.com/<%=server%>/buddyicons/<%=nsid%>.jpg'
    parseIconUrl = (params) -> _.template iconUrl, params

    $rootScope.cleanCurrentUser = ->
      $rootScope.currentUser = null

    $rootScope.setCurrentUser = (user) ->
      $rootScope.currentUser = user
      $rootScope.currentUserIconUrl = null
      People.getInfo user.nsid
      .then (info) ->
        _.extend $rootScope.currentUser, info
        $rootScope.currentUserIconUrl = parseIconUrl
          farm: info.iconfarm
          server: info.iconserver
          nsid: info.nsid

    $rootScope.$on '$stateChangeError', (event, toState, toParams, fromState, fromParams, error) ->
      switch error
        when 'authExpired'
          $state.go 'logout', {isExpired: true}, {inherit: false}
]
