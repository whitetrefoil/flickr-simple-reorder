'use strict'

angular.module 'flickrSimpleReorder'
.provider 'Auth', ->
  $.cookie.json = true;

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
        params.auth_token = _auth.token

    _(params).pairs().sortBy(0).forEach (param) ->
      strToSign += param[0] + param[1]
      convertedUrl += "#{param[0]}=#{param[1]}&"

    sig = @sigMethod strToSign
    "#{convertedUrl}api_sig=#{sig}"

  _auth = $.cookie 'auth'

  @$get = [ '$http', ($http) =>
    exports =
      signUrl: @signUrl

      authUrl: => @signUrl @authUrl,
        perms: @perms
      , 'login'

      getToken: (frob) =>
        url = @signUrl @getTokenUrl,
          method: 'flickr.auth.getToken'
          frob: frob
        , 'token'
        $http.get(url)

      clearAuth: =>
        _auth = {}
        $.removeCookie 'auth'

      setAuth: (auth) =>
        _auth =
          perms: auth.perms._content
          token: auth.token._content
          user: auth.user
        $.cookie 'auth', _auth,
          expires: 30

    Object.defineProperties exports,
      perms:
        get: -> _auth.perms
      token:
        get: -> _auth.token
      user:
        get: -> _auth.user

    exports
  ]

  return
