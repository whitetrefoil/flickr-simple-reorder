'use strict'

angular.module 'flickrSimpleReorder'
.config [
  '$stateProvider'
  '$urlRouterProvider'
  (
    $stateProvider
    $urlRouterProvider
  ) ->

    $urlRouterProvider.otherwise '/photosets'

    $stateProvider
    .state 'login',
      url: '/login?frob&isFrobInvalid'
      controller: 'LoginCtrl'
      templateUrl: 'tpls/login.html'

    .state 'logout',
      url: '/logout?isSilent&isExpired'
      controller: 'LogoutCtrl'
      templateUrl: 'tpls/logout.html'

    .state 'photosets',
      url: '/photosets'
      controller: 'PhotosetsCtrl'
      templateUrl: 'tpls/photosets.html'
      resolve:
        user: ['Auth', (Auth) -> Auth.checkToken()]

    .state 'about',
      url: '/about'
      templateUrl: 'tpls/about.html'
      controller: ['Auth', (Auth) -> Auth.checkToken()]

]
