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
      url: '/about?section'
      templateUrl: 'tpls/about.html'
      controller: ['Auth', '$stateParams', 'offsetScroll'
        (Auth, $stateParams, offsetScroll) ->
          Auth.checkToken()
          offsetScroll($stateParams.section)
      ]

    .state 'faq',
      url: '/faq?section'
      templateUrl: 'tpls/faq.html'
      controller: ['Auth', '$stateParams', 'offsetScroll'
        (Auth, $stateParams, offsetScroll) ->
          Auth.checkToken()
          offsetScroll($stateParams.section)
      ]

]
