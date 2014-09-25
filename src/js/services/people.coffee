'use strict'

angular.module 'flickrSimpleReorder'
.provider 'People', ->
  config = this

  @url = 'https://api.flickr.com/services/rest/'
  @format = 'json'
  @methods =
    getInfo: 'flickr.people.getInfo'

  @$get = [
    '$http'
    '$q'
    'Auth'
    (
      $http
      $q
      Auth
    ) ->
      getInfo: (id) ->
        def = $q.defer()
        $http.get Auth.signUrl config.url,
          method: config.methods.getInfo
          user_id: id
        .then (res) ->
          if res.data.stat isnt 'ok'
            def.reject res.data.message
          else
            info = res.data.person
            info.username = info.username._content
            info.realname = info.realname._content
            info.mbox_sha1sum = info.mbox_sha1sum._content
            info.location = info.location._content
            info.description = info.description._content
            info.photosurl = info.photosurl._content
            info.profileurl = info.profileurl._content
            info.mobileurl = info.mobileurl._content
            info.photos.firstdatetaken = info.photos.firstdatetaken._content
            info.photos.firstdate = info.photos.firstdate._content
            info.photos.count = info.photos.count._content
            info.photos.views = info.photos.views._content
            def.resolve info
        def.promise

  ]

  return
