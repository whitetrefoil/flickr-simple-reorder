'use strict'

angular.module 'flickrSimpleReorder'
.provider 'Photosets', ->
  @url = 'https://api.flickr.com/services/rest/'
  @format = 'json'
  @methods =
    getList: 'flickr.photosets.getList'
    reorderPhotos: 'flickr.photosets.reorderPhotos'

  @$get = [
    '$http', '$q', 'Auth'
    ($http, $q, Auth) =>
      getList: (page = 1) =>
        deferred = $q.defer()
        $http.get Auth.signUrl @url,
          method: @methods.getList
          user_id: Auth.user.nsid
          per_page: 10
          page: page
        .then (res) ->
          if res.data.stat isnt 'ok'
            deferred.reject res.data.message
          else
            deferred.resolve res.data.photosets

        deferred.promise
  ]

  return
