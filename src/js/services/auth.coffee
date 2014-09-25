'use strict'

angular.module 'flickrSimpleReorder'
.provider 'Auth', ->
  config = this

  @authUrl = 'http://flickr.com/services/auth/'
  @endpoint = 'https://api.flickr.com/services/rest/'
  @methods =
    getToken: 'flickr.auth.getToken'
    checkToken: 'flickr.auth.checkToken'
  @apiKey = '5cdc0f5ec9c28202f1098f615edba5cd'
  @apiSecret = 'e3b842e3b923b0fb'
  @perms = 'write'
  @sigMethod = (new Hashes.MD5).hex
  @format = 'json'

  @signUrl = (url, params = {}, step = 'normal') =>
    if _.isString(params)
      step = params
      params = {}

    strToSign = @apiSecret
    convertedUrl = url + '?'
    params.api_key = @apiKey
    switch step
      when 'login' then null  # nothing to do
      when 'token'
        params.format ||= @format unless _.isEmpty @format
        params.nojsoncallback ||= 1
      else
        params.format ||= @format unless _.isEmpty @format
        params.nojsoncallback ||= 1
        params.auth_token = $.cookie 'token'

    _(params).pairs().sortBy(0).forEach (param) ->
      strToSign += param[0] + param[1]
      convertedUrl += "#{param[0]}=#{param[1]}&"

    sig = @sigMethod strToSign
    "#{convertedUrl}api_sig=#{sig}"

  @$get = [
    '$http'
    '$q'
    '$state'
    '$rootScope'
    (
      $http
      $q
      $state
      $rootScope
    ) ->
      signUrl: config.signUrl

      authUrl: ->
        config.signUrl config.authUrl,
          perms: config.perms
        , 'login'

      getToken: (frob) ->
        def = $q.defer()
        url = config.signUrl config.endpoint,
          method: config.methods.getToken
          frob: frob
        , 'token'
        $http.get(url)
        .then (res) ->
          if res.data.stat isnt 'ok'
            def.reject()
            $state.go 'login',{isFrobInvalid: true}, {inherit: false}
          else
            _token = res.data.auth.token._content
            _user = res.data.auth.user
            $.cookie 'token', _token, { expires: 30 }
            $rootScope.setCurrentUser _user
            def.resolve _user
        def.promise

      checkToken: ->
        def = $q.defer()
        url = config.signUrl config.endpoint,
          method: config.methods.checkToken
        $http.get(url)
        .then (res) ->
          if res.data.stat isnt 'ok'
            def.resolve
            $state.go 'logout', {isExpired: true}, {inherit: false}
          else
            _user = res.data.auth.user
            $.cookie 'token', $.cookie('token'), { expires: 30 }
            $rootScope.setCurrentUser _user
            def.resolve _user
        def.promise

      clearAuth: ->
        $.removeCookie 'token'
        $.removeCookie 'user'
        $rootScope.cleanCurrentUser()
  ]

  return
