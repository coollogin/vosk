import vue from 'vue'
import M from 'materialize-css/dist/js/materialize.js'
// const { ipcRenderer } = window.require('electron')

export default {
  state: {
    groups: []
  },
  actions: {
    async updateNumGroups (context) {
      context.commit('SET_PROCESSING', true)
      // await ipcRenderer.send('updateNumGroups', 'Group')
      context.commit('SET_PROCESSING', false)
    },
    async fetchGroupsfromBD ({ commit }) {
      commit('SET_PROCESSING', true)
      let groups = []
      await vue.$db.collection('groups')
        .get()
        .then(QuerySnapshot => {
          QuerySnapshot.forEach(item => {
            let group = item.data()
            group.id = item.id
            groups.push(group)
          })
          commit('UPDATEGROUPS', groups)
        })
        .catch(error => {
          console.log(error)
          if (error.message === 'Quota exceeded.') M.toast({ html: 'Превышен лимит обращений к БД', classes: 'red' })
        })
      commit('SET_PROCESSING', false)
    },
    async saveGroups (context, newGroups) {
      context.commit('SET_PROCESSING', true)
      let allGroups = context.getters.allGroups

      // При единичном добавлении
      if (newGroups.length === 1) {
        // Проверяем на уникальность
        if (allGroups.findIndex(item => newGroups[0] === item.label) > 0) {
          context.commit('SET_PROCESSING', false)
          M.toast({ html: 'Такая группа уже есть', classes: 'red' })
          return
        }
        await vue.$db.collection('groups').doc().set({ label: newGroups[0] }).then(function (item) {
          // context.commit('ADDGROUP', { label: newGroups[0] })
          context.dispatch('fetchGroupsfromBD')
        })
      }

      // При загрузке файла
      if (newGroups.length > 1) {
        // Объединяем массивы
        Array.prototype.push.apply(allGroups, newGroups)
        // Оставляем уникальные
        // const uniqueGroups = Array.from(new Set(allGroups))
        // allGroups = [] // Освобождаем память
        await newGroups.forEach(group => {
          if (allGroups.map(group => group.label).indexOf(group) === -1) {
            vue.$db.collection('groups').doc().set({ label: group })
          }
        })
        context.dispatch('fetchGroupsfromBD')
      }
      // await ipcRenderer.send('saveGroups', newGroups, oldGroups)
      context.commit('SET_PROCESSING', false)
    },
    async deleteGroup (context, id) {
      context.commit('SET_PROCESSING', true)
      await vue.$db.collection('groups').doc(id).delete().then(function (item) {
        context.commit('DELLGROUP', id)
      })
      context.commit('SET_PROCESSING', false)
      // let oldGroups = context.getters.allGroups
      // await ipcRenderer.send('deleteGroup', id, oldGroups)
    },
    async dellAllGroups ({ commit }) {
      commit('SET_PROCESSING', true)
      await vue.$db.collection('groups')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete()
          })
        })
      commit('SET_PROCESSING', false)
    }
  },
  mutations: {
    UPDATEGROUPS (state, groups) {
      state.groups = groups
      // console.log(state.groups)
    },
    ADDGROUP (state, group) {
      // state.groups.push(group)
    },
    DELLGROUP (state, id) {
      let pos = state.groups.findIndex(group => group.id === id)
      state.groups.splice(pos, 1)
    }

  },
  getters: {
    allGroups (state) {
      // console.log('allGroups getters')
      return state.groups
    },
    getGroupsLength (state, getters) {
      if (state.groups) {
        return getters.allGroups.length
      } else {
        return 0
      }
    }
  }
}
