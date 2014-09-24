'use strict'

angular.module 'flickrSimpleReorder'
.config [
  '$stateProvider'
  '$urlRouterProvider'
  ($stateProvider, $urlRouterProvider) ->

    $urlRouterProvider.otherwise '/photosets'

    $stateProvider
    .state 'login',
      url: '/login?frob'
      controller: 'LoginCtrl'
      templateUrl: 'tpls/login.html'

    .state 'logout',
      url: '/logout?isSilent'
      controller: 'LogoutCtrl'
      templateUrl: 'tpls/logout.html'

    .state 'photosets',
      url: '/photosets'
      controller: 'PhotosetsCtrl'
      templateUrl: 'tpls/photosets.html'
]
