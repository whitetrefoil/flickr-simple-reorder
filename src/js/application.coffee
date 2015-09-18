'use strict'

angular.module 'flickrSimpleReorder', [
  'ngStorage'
  'ui.router'
  'ui.bootstrap'
  'angularMoment'
  'offsetScroll'
]
.config ['$compileProvider', ($compileProvider) ->
  # 这个设置会在执行 `gulp release` 时被替换成 `false`
  $compileProvider.debugInfoEnabled(true);
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
