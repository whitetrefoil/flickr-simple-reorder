'use strict'

angular.module 'flickrSimpleReorder'
.controller 'RootCtrl', [
  '$rootScope'
  '$modal'
  '$location'
  'People'
  (
    $rootScope
    $modal
    $location
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

]
