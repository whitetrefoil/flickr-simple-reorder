import clearRequire from 'clear-require'
import * as t       from '../../src/store/types'

const MODULE_TO_TEST = '../../src/store/mutations'

let state, mutations

beforeEach(() => {
  mutations = require(MODULE_TO_TEST).mutations

  state = {
    modalShowing: 0,
  }
})

afterEach(() => {
  clearRequire(MODULE_TO_TEST)
})

describe('store :: mutations', () => {
  describe(':: ONE_MORE_MODAL', () => {
    test('should +1', () => {
      mutations[t.ONE_MORE_MODAL](state)
      expect(state.modalShowing).toBe(1)
    })
  })

  describe(':: ONE_LESS_MODAL', () => {
    test('should -1', () => {
      state.modalShowing = 3
      mutations[t.ONE_LESS_MODAL](state)
      expect(state.modalShowing).toBe(2)
    })

    test('should never be less than 0', () => {
      state.modalShowing = 0
      mutations[t.ONE_LESS_MODAL](state)
      expect(state.modalShowing).toBe(0)
    })
  })
})
