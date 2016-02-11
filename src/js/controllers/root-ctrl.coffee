'use strict'

angular.module 'flickrSimpleReorder'
.controller 'RootCtrl', [
  '$rootScope'
  '$uibModal'
  '$location'
  '$state'
  '$localStorage'
  'People'
  'RELEASE'
  (
    $rootScope
    $uibModal
    $location
    $state
    $ls
    People
    RELEASE
  ) ->
    $rootScope.$ls = $ls

    unless $ls['ignoreWarning'] is RELEASE
      $uibModal.open
        templateUrl: 'tpls/development-warning.html'
        backdrop: 'static'
        keyboard: false
        size: 'lg'
        windowClass: 'modal-danger'
        controller: ['$scope', '$uibModalInstance', '$window', ($scope, $uibModalInstance, $window) ->
          $scope.ok = ->
            $ls['ignoreWarning'] = RELEASE
            $uibModalInstance.close()
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
