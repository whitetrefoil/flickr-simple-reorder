const actions = require('../../../src/store/login/actions')

describe('LoginActions ::', () => {
  describe('calculateSig() ::', () => {
    it('should pass', () => {
      const secret = '000005fab4534d05'
      const params = {
        api_key: '9a0554259914a86fb9e7eb014e4e5d52',
        perms  : 'write',
      }
      expect(actions.calculateSig(params, secret)).toEqual('a02506b31c1cd46c2e0b6380fb94eb3d')
    })
  })

  describe('composeGetUrl() ::', () => {
    it('should pass', () => {
      const authUrl = 'http://flickr.com/services/auth/'
      const secret  = '000005fab4534d05'
      const params  = {
        api_key: '9a0554259914a86fb9e7eb014e4e5d52',
        perms  : 'write',
      }
      expect(actions.composeGetUrl(params, secret, authUrl))
        .toEqual('http://flickr.com/services/auth/?api_key=9a0554259914a86fb9e7eb014e4e5d52&perms=write&api_sig=a02506b31c1cd46c2e0b6380fb94eb3d')
    })
  })
})
