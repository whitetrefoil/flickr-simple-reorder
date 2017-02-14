import * as Vue      from 'vue'
import * as Vuex     from 'vuex'
import { actions }   from './actions'
import { mutations } from './mutations'
import { state }     from './state'

Vue.use(Vuex)

export const login = new Vuex.Store({
  actions,
  mutations,
  state,
})
