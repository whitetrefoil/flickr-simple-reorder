'use strict'

angular.module 'flickrSimpleReorder', [
  'ngCookies'
  'ui.router'
  'ui.bootstrap'
  'angularMoment'
  'offsetScroll'
]
.config ['$anchorScrollProvider', ($anchorScrollProvider) ->
  $anchorScrollProvider.disableAutoScrolling()
]
.config ['offsetScrollProvider', (offsetScrollProvider) ->
  offsetScrollProvider.setOffset 70
]

.config ['$cookiesProvider', ($cookiesProvider) ->
  $cookiesProvider.expires =  new Date(new Date().valueOf() + 30 * 24 * 60 * 60 * 1000)
]
