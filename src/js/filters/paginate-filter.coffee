'use strict'

angular.module 'flickrSimpleReorder'
.filter 'paginate', ->
  (input, page, perPage) ->
    return [] unless input?
    start = (page - 1) * perPage
    end = start + perPage
    input.slice start, end
