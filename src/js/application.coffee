'use strict'

angular.module 'flickrSimpleReorder', ['ui.router', 'ui.bootstrap', 'angularMoment', 'offsetScroll']
.config ['$anchorScrollProvider', ($anchorScrollProvider) ->
  $anchorScrollProvider.disableAutoScrolling()
]
.config ['offsetScrollProvider', (offsetScrollProvider) ->
  offsetScrollProvider.setOffset 70
]
