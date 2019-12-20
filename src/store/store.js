import Vue from 'vue'
import Vuex from 'vuex'
import posts from './modules/posts'
import favorites from './modules/favorites'
import groups from './modules/groups'
import settings from './modules/settings'
import stats from './modules/stats'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    AuthorizationStatus: false,
    user: {},
    processing: false,
    percent: -1,
    isStop: false,
    error: null,
    searchKey: ''
  },
  modules: {
    posts, favorites, groups, settings, stats
  },
  getters: {
    getAuthorizationStatus: (state) => state.AuthorizationStatus,
    getProcessing: (state) => state.processing,
    getPercent: (state) => state.percent,
    getIsStop: (state) => state.isStop,
    getError: (state) => {},
    getSearchKey: (state) => state.searchKey,
    getUserInfo: (state) => state.user
  },
  mutations: {
    SET_PROCESSING (state, data) {
      state.processing = data
    },
    SET_PERCENT (state, data) {
      state.percent = data
    },
    SET_ERROR (state, data) {
      state.error = data
    },
    CLEAR_ERROR (state) {
      state.error = null
    },
    UPDATEAUTHORIZATIONSTATUS (state, data) {
      state.AuthorizationStatus = data
    },
    SETUSERINFO (state, data) {
      state.user = data
    },
    SET_STOP (state, data) {
      state.isStop = data
    },
    updateSearchKey (state, data) {
      state.searchKey = data
    }
  },
  actions: {
    changeAuthStatus (context, credentials) {
      context.commit('UPDATEAUTHORIZATIONSTATUS', credentials)
    },
    setSearchKey (context, credentials) {
      context.commit('updateSearchKey', credentials)
    }
    // SIGNIN ({ commit }, data) {
    //   commit('SET_PROCESSING', true)
    //   firebase.auth().signInWithEmailAndPassword(data.email, data.password)
    //     .then(user => {
    //       commit('SET_PROCESSING', false)
    //       commit('UPDATEAUTHORIZATIONSTATUS', true)
    //       // console.log(user)
    //     }).catch(error => {
    //       commit('SET_PROCESSING', false)
    //       commit('SET_ERROR', error.message)
    //       // console.log(error)
    //     })
    // }

    // retrieveToken(context, credentials){
    //
    //   easyvk({
    //     username: credentials.username,
    //     password: credentials.password,
    //     save_session: credentials.savesassion,
    //     session_file: '.my-session'
    //   }).then( response => {
    //     console.log("I am log in")
    //   }).catch( error => {
    //     console.log(error.message)
    //   })
    // }
  }
})
