// tslint:disable:no-implicit-dependencies

import clearRequire from 'clear-require'

let log

beforeEach(() => {
  log = require('../../src/services/log')
})

afterEach(() => {
  clearRequire('../../src/services/log')
})

describe('services :: log', () => {
  test('should have a function names "getLogger"', () => {
    expect(log.getLogger).toBeDefined()
  })
})
