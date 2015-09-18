'use strict'

angular.module 'flickrSimpleReorder', [
  'ngStorage'
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
.config ['$localStorageProvider', ($localStorageProvider) ->
  $localStorageProvider.setKeyPrefix('flickrSimpleReorder-')
]
