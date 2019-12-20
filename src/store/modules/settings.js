import vue from 'vue'
// import M from 'materialize-css/dist/js/materialize.js'

export default {
  state: {
    settings: {}
  },
  actions: {
    async fetchSettingsfromBD ({ commit }) {
      commit('SET_PROCESSING', true)
      let Settings = []
      await vue.$db.collection('settings')
        .get()
        .then(QuerySnapshot => {
          Settings = QuerySnapshot.docs[0].data()
          // console.log(Settings)
          commit('UPDATESETTINGS', Settings)
        })
        .catch(error => {
          console.log(error)
        })
      commit('SET_PROCESSING', false)
    },
    async saveMinusWords ({ commit }, minusWords) {
      commit('SET_PROCESSING', true)
      await vue.$db.collection('settings').doc('mydyK24KuTZtCK3JQ4Ou').set({ minusWords: minusWords }, { merge: true })
      commit('SET_PROCESSING', false)
    }
  },
  mutations: {
    UPDATESETTINGS (state, settings) {
      state.settings = settings
    }
  },
  getters: {
    getAllSettings (state) {
      return state.settings
    }
  }
}
