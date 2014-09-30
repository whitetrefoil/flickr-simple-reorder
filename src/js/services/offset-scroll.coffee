'use strict'

angular.module 'offsetScroll', []
.provider 'offsetScroll', ->

  jq = angular.element
  @setJQuery = (val) -> jq = val

  offset = 0
  @setOffset = (val) -> offset = val

  scrollFn = ['$window', ($window) ->
    (y) -> $window.scroll 0, y
  ]
  @setScrollFn = (val) -> scrollFn = val

  @$get = [
    '$injector'
    '$location'
    '$anchorScroll'
    '$log'
    (
      $injector
      $location
      $anchorScroll
      $log
    ) ->
      if !jq().jquery?
        $log.error 'The "offsetScrollModule" module requires "jQuery" ~> 2.1 to work.  Returning original "$anchorScroll" as fallback.'
        $anchorScroll
      else
        if parseFloat(jq().jquery) < 2.1
          $log.warn "The \"offsetScrollModule\" module requires \"jQuery\" ~> 2.1 to work.  While currently version #{jq().jquery} is detected."
        (hash) ->
          hash ||= $location.hash()
          scroll = $injector.instantiate(scrollFn)
          if hash? and hash.length > 0
            elem = jq('#' + hash)
            if elem? and elem.length > 0
              top = elem.offset().top
              scroll top - offset
            else
              scroll 0
          else
            scroll 0
  ]

  return
