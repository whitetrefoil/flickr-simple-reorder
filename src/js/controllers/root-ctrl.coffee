'use strict'

angular.module 'flickrSimpleReorder'
.controller 'RootCtrl', [
  '$rootScope'
  '$modal'
  '$location'
  '$state'
  'People'
  (
    $rootScope
    $modal
    $location
    $state
    People
  ) ->
    unless $location.host() is 'localhost'
      $modal.open
        templateUrl: 'tpls/development-warning.html'
        backdrop: 'static'
        keyboard: false
        size: 'lg'
        windowClass: 'modal-danger'
        controller: ['$scope', '$modalInstance', '$window', ($scope, $modalInstance, $window) ->
          $scope.ok = -> $modalInstance.close()
          $scope.no = -> $window.open('http://www.flickr.com', '_self')
        ]

    renderIconUrl = _.template('http://farm<%=user.farm%>.staticflickr.com/<%=user.server%>/buddyicons/<%=user.nsid%>.jpg', { variable: 'user' })
    parseIconUrl = (params) -> renderIconUrl(params)

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
