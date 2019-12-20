import vue from 'vue'
// import M from 'materialize-css/dist/js/materialize.js'

export default {
  state: {
    stats: []
  },
  actions: {
    async fetchStatsfromBD ({ commit }) {
      commit('SET_PROCESSING', true)
      let now = new Date()
      let dateNow = (now.setHours(0, 0, 0, 0) / 1000) - (5 * 24 * 3600)
      let stats = []
      await vue.$db.collection('stats').where('date', '>=', dateNow).orderBy('date', 'asc')
        .get()
        .then(QuerySnapshot => {
          QuerySnapshot.forEach(item => {
            let elStats = item.data()
            elStats.id = item.id
            stats.push(elStats)
          })
          commit('UPDATESTATS', stats)
        })
        .catch(error => {
          console.log(error)
          // if (error.message === 'Quota exceeded.') M.toast({ html: 'Превышен лимит обращений к БД', classes: 'red' })
        })
      commit('SET_PROCESSING', false)
    },
    async addStatsToBD ({ commit }) {
      commit('SET_PROCESSING', true)
      // await vue.$db.collection('stats').doc().set({ date: 1576627200, requests: 370, user: 'Света Иванова', user_id: 32423 })
      // await vue.$db.collection('stats').doc().set({ date: 1576540800, requests: 480, user: 'Света Иванова', user_id: 32423 })
      // await vue.$db.collection('stats').doc().set({ date: 1576454400, requests: 756, user: 'Света Иванова', user_id: 32423 })
      // await vue.$db.collection('stats').doc().set({ date: 1576368000, requests: 284, user: 'Света Иванова', user_id: 32423 })
      //
      // await vue.$db.collection('stats').doc().set({ date: 1576627200, requests: 659, user: 'Сергей Кулагин', user_id: 12432 })
      // await vue.$db.collection('stats').doc().set({ date: 1576540800, requests: 328, user: 'Сергей Кулагин', user_id: 12432 })
      // await vue.$db.collection('stats').doc().set({ date: 1576454400, requests: 624, user: 'Сергей Кулагин', user_id: 12432 })
      // await vue.$db.collection('stats').doc().set({ date: 1576368000, requests: 812, user: 'Сергей Кулагин', user_id: 12432 })
      commit('SET_PROCESSING', false)
    }
  },
  mutations: {
    UPDATESTATS (state, stats) {
      state.stats = stats
    }
  },
  getters: {
    getStats (state) {
      // console.log('allGroups getters')
      return state.stats
    }
  }
}
