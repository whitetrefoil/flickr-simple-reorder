'use strict'

angular.module 'flickrSimpleReorder', ['ui.router', 'angularMoment', 'offsetScroll', 'ngMaterial']
.config ['$anchorScrollProvider', ($anchorScrollProvider) ->
  $anchorScrollProvider.disableAutoScrolling()
]
.config ['offsetScrollProvider', (offsetScrollProvider) ->
  offsetScrollProvider.setOffset 70
]
