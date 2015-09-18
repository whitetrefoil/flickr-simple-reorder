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

  @$get = [
    '$http'
    '$q'
    '$state'
    '$rootScope'
    '$localStorage'
    (
      $http
      $q
      $state
      $rootScope
      $ls
    ) ->
      getCachedToken = ->
        return unless $ls['temp']?
        return unless $ls['temp'].t?
        return unless $ls['temp'].e?
        return if $ls['temp'].e < new Date().valueOf()
        $ls['temp'].t


      signUrl = (url, params = {}, step = 'normal') ->
        if _.isString(params)
          step = params
          params = {}

        strToSign = config.apiSecret
        convertedUrl = url + '?'
        params.api_key = config.apiKey
        switch step
          when 'login' then null  # nothing to do
          when 'token'
            params.format ||= config.format unless _.isEmpty config.format
            params.nojsoncallback ||= 1
          else
            params.format ||= config.format unless _.isEmpty config.format
            params.nojsoncallback ||= 1
            params.auth_token = getCachedToken()

        _(params).pairs().sortBy(0)
        .forEach (param) ->
          strToSign += param[0] + param[1]
          convertedUrl += "#{param[0]}=#{param[1]}&"
        .value()

        sig = config.sigMethod strToSign
        "#{convertedUrl}api_sig=#{sig}"


      exports =
        signUrl: signUrl


        authUrl: ->
          signUrl config.authUrl,
            perms: config.perms
          , 'login'


        getToken: (frob) ->
          def = $q.defer()
          url = signUrl config.endpoint,
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
              $ls['temp'] =
                t: _token
                e: new Date().valueOf() + 30 * 24 * 60 * 60 * 1000
              $rootScope.setCurrentUser _user
              def.resolve _user
          def.promise


        checkToken: ->
          def = $q.defer()
          cachedToken = getCachedToken()
          if cachedToken?
            url = signUrl config.endpoint,
              method: config.methods.checkToken
            $http.get(url)
            .then (res) ->
              if res.data.stat isnt 'ok'
                def.reject 'authExpired'
              else
                _user = res.data.auth.user
                $ls['temp'].e = new Date().valueOf() + 30 * 24 * 60 * 60 * 1000
                $rootScope.setCurrentUser _user
                def.resolve _user
          else
            def.reject 'authExpired'
          def.promise


        clearAuth: ->
          delete $ls['temp']
          $rootScope.cleanCurrentUser()


      exports
  ]

  this
