'use strict'

angular.module 'flickrSimpleReorder'
.provider 'Auth', ->
  config = this

  @authUrl = 'http://flickr.com/services/auth/'
  @getTokenUrl = 'https://api.flickr.com/services/rest/'
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
        params.auth_token = _token

    _(params).pairs().sortBy(0).forEach (param) ->
      strToSign += param[0] + param[1]
      convertedUrl += "#{param[0]}=#{param[1]}&"

    sig = @sigMethod strToSign
    "#{convertedUrl}api_sig=#{sig}"

  _token = $.cookie('token')
  _user = {}

  @$get = [ '$http', ($http) ->
    exports =
      signUrl: config.signUrl

      authUrl: ->
        config.signUrl config.authUrl,
          perms: config.perms
        , 'login'

      getToken: (frob) ->
        url = config.signUrl config.getTokenUrl,
          method: 'flickr.auth.getToken'
          frob: frob
        , 'token'
        $http.get(url)

      clearAuth: ->
        _token = null
        $.removeCookie 'token'

      setAuth: (auth) ->
        _token = auth.token._content
        _user = auth.user
        $.cookie 'token', _token,
          expires: 30

    Object.defineProperties exports,
      token:
        get: -> _token
      user:
        get: -> _user

    exports
  ]

  return
