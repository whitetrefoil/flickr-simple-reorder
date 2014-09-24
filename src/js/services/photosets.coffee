'use strict'

angular.module 'flickrSimpleReorder'
.provider 'Photosets', ->
  config = this

  @url = 'https://api.flickr.com/services/rest/'
  @format = 'json'
  @methods =
    getList: 'flickr.photosets.getList'
    getPhotos: 'flickr.photosets.getPhotos'
    reorderPhotos: 'flickr.photosets.reorderPhotos'
  @photosPerRequest = 500

  @$get = [
    '$http', '$q', 'Auth'
    ($http, $q, Auth) =>
      getList: (page = 1) ->
        deferred = $q.defer()
        $http.get Auth.signUrl config.url,
          method: config.methods.getList
          user_id: Auth.user.nsid
          per_page: 10
          page: page
        .then (res) ->
          if res.data.stat isnt 'ok'
            deferred.reject res.data.message
          else
            deferred.resolve res.data.photosets
        deferred.promise

      getOnePageOfPhotos: (photosetId, page = 1) ->
        deferred = $q.defer()
        $http.get Auth.signUrl config.url,
          method: config.methods.getPhotos
          photoset_id: photosetId
          page: page
          per_page: config.photosPerRequest
          extras: 'date_upload'
        .then (res) ->
          if res.data.stat isnt 'ok'
            deferred.reject res.data.message
          else
            deferred.resolve res.data.photoset
        deferred.promise

      getPhotos: (photosetId, total) ->
        deferred = $q.defer()
        totalPages = Math.ceil total / config.photosPerRequest
        photos = []
        requests = _.times totalPages, (page) =>
          @getOnePageOfPhotos photosetId, page
          .then (data) =>
            photos[page] = data.photo
        $q.all(requests).then ->
          deferred.resolve _.flatten(photos)
        deferred.promise

      reorderPhotos: (photosetId, photoIds) ->
        deferred = $q.defer()
        url = Auth.signUrl config.url,
          method: config.methods.reorderPhotos
          photoset_id: photosetId
          photo_ids: photoIds.toString()
        $http.post url
        .then (data) ->
          console.log data
        deferred.promise
  ]

  return
