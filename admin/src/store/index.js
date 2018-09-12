import Vue from 'vue'
import Vuex from 'vuex'
import carmap from './modules/carmap' 

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    carmap
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
