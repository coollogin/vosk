import vue from 'vue'
import M from 'materialize-css/dist/js/materialize.js'
const easyvk = window.require('easyvk') // API Вконтакте

export default {
  state: {
    posts: []
  },
  actions: {
    async fetchPostsfromBD ({ commit }) {
      commit('SET_PROCESSING', true)
      let posts = []
      await vue.$db.collection('posts')
        .orderBy('date', 'desc')
        .get()
        .then(QuerySnapshot => {
          QuerySnapshot.forEach(item => {
            let post = item.data()
            post.id = item.id
            posts.push(post)
          })
          commit('UPDATEPOSTS', posts)
        })
        .catch(error => console.log(error))
      commit('SET_PROCESSING', false)
    },
    async SavePosts (context, getters) {
      if (context.getters.getGroupsLength === 0) {
        M.toast({ html: 'Нет ни одной группы!', classes: 'red' })
        return
      }
      if (context.getters.getGroupsLength === -654) { // Проверить на частоту обновления!!!!!!!!!!!!!!!!
        M.toast({ html: 'Слишком частое обновление Постов', classes: 'yellow' })
      }
      context.commit('SET_PROCESSING', true)
      context.commit('SET_PERCENT', 0)

      // Отправляем запрос в ВК
      easyvk().then(async vk => {
        let allPosts = []
        let groups = context.getters.allGroups
        let settings = context.getters.getAllSettings
        let nToken = 0
        let ownerId = ''
        let requests = 0
        let minusWords = context.getters.getAllSettings.minusWords.split('#').filter(item => item !== '')
        let favPosts = context.getters.favoritesPosts.map(item => item.id)
        // Функция фильтрации массива от дубликотов по ключу text
        // function removeDuplicates (array) {
        //   return array.filter((item, index, arr) => {
        //     const c = arr.map(item => item.text)
        //     return index === c.indexOf(item.text)
        //   })
        // }

        for (let k = 0; k <= groups.length - 1; k++) {
          // Если нажата кнопка отмены, то выходим
          if (context.getters.getIsStop) {
            context.commit('SET_STOP', false)
            context.commit('SET_PERCENT', -1)
            context.commit('SET_PROCESSING', false)
            break
          }

          // текущая группа/ паблик
          let igroup = groups[k].label

          // Ставим паузу
          let setDelay = new Promise((resolve, reject) => {
            setTimeout(() => resolve('готово!'), 1000 * settings.delay)
          })
          await setDelay
          console.log('Обрабатываю: ' + igroup)

          // Определяем Группа или Паблик
          if (igroup.includes('public')) {
            ownerId = '-' + igroup.replace('public', '')
            igroup = ''
          } else {
            ownerId = ''
          }

          // Получаем посты и сопутствующую информацию

          // считаем запросы для статистики
          requests++

          let { vkr } = await vk.call('wall.get', {
            access_token: settings.tokens[nToken],
            owner_id: ownerId,
            domain: igroup,
            count: settings.postsForGroup,
            filter: 'all',
            extended: 1,
            v: '5.102'
          })

          // Обрабатываем результат
          let filteredPosts = vkr.items.map((post, i) => {
            // Количество дней от публикации поста
            let now = new Date()
            let daysLeft = (now.getTime() - post.date * 1000) / (3600 * 24 * 1000)

            // Выявляем, в избранном пост или нет
            let fav
            let tempId = vkr.groups[0].id + '' + post.id
            if (context.getters.favoritesPosts.length > 0) {
              fav = favPosts.findIndex(item => item === tempId)
            }

            // Берем посты только за последние n дней и не пустые
            if (daysLeft <= settings.period && post.text !== '') {
              return {
                id: vkr.groups[0].id + '' + post.id,
                post_id: post.id,
                date: post.date,
                text: post.text ? post.text : '',
                favorite: fav >= 0,
                link: 'https://vk.com/' + igroup + '?w=wall-' + vkr.groups[0].id + '_' + post.id,
                groupName: vkr.groups[0].name,
                groupId: vkr.groups[0].id,
                groupAvatar: vkr.groups[0].photo_50,
                attachments: post.attachments ? post.attachments : {}
              }
            } else { return 'undefined' }
            // Проверяем, чтобы пост был и не повторялся
          })
            .filter(post => post !== 'undefined' && allPosts.findIndex(item => item.text === post.text) < 0)
            .filter(post => {
              let result = true
              minusWords.forEach(minusWord => {
                if (post.text.includes(minusWord)) result = false
              })
              return result
            })

          // Добавляем новые посты
          Array.prototype.push.apply(allPosts, filteredPosts)
          // allPosts.push(filteredPosts)

          nToken++
          // Меняем Токен
          if (nToken > settings.tokens.length - 1) nToken = 0

          // Считаем процент выполнения
          let percent = (k * 100) / groups.length
          context.commit('SET_PERCENT', Math.floor(percent))
        } // End for
        // context.commit('SET_PERCENT', 'Сохраняю в БД')

        // Сохраняем статистику по запросам
        let now = new Date()
        let dateNow = now.setHours(0, 0, 0, 0) / 1000
        let stat = {
          date: dateNow,
          requests: requests,
          user: context.getters.getUserInfo.first_name + ' ' + context.getters.getUserInfo.last_name,
          user_id: context.getters.getUserInfo.user_id
        }

        await vue.$db.collection('stats').where('date', '==', dateNow)
          .get()
          .then(QuerySnapshot => {
            // Если такой даты нет
            if (QuerySnapshot.size === 0) {
              vue.$db.collection('stats').doc().set(stat)
            }
            // Если такая дата уже есть
            if (QuerySnapshot.size > 0) {
              let docId = ''
              QuerySnapshot.forEach(item => {
                // Ищем пользователя
                if (item.data().user === stat.user) {
                  docId = item.id
                  let newRequests = item.data().requests + stat.requests
                  vue.$db.collection('stats').doc(docId).set({ requests: newRequests }, { merge: true })
                }
              })
              if (docId === '') {
                vue.$db.collection('stats').doc().set(stat)
              }
            }
          })
          .catch(error => console.log(error))

        // Удаляем все посты кроме Favorites
        // await vue.$db.collection('posts').where('favorite', '==', false)
        //   .get()
        //   .then(querySnapshot => {
        //     querySnapshot.forEach(doc => {
        //       doc.ref.delete()
        //     })
        //     // console.log('DELETED')
        //   })

        // Удаляем дубликаты
        // allPosts
        //   .sort((a, b) => a.text < b.text)
        //   .filter((current, index, array) => index === 0 || current.text !== array[index - 1].text)

        // Сохраняем новые
        // allPosts.forEach(post => {
        //   vue.$db.collection('posts').doc().set(post)
        // })

        // Ставим дату обновления
        // await vue.$db.collection('settings').doc('mydyK24KuTZtCK3JQ4Ou').set({ lastUpdate: now }, { merge: true })

        // Загружаем посты из БД

        // let posts = []
        // await vue.$db.collection('posts')
        //   .orderBy('date', 'desc')
        //   .get()
        //   .then(QuerySnapshot => {
        //     QuerySnapshot.forEach(item => {
        //       let post = item.data()
        //       post.id = item.id
        //       posts.push(post)
        //     })
        //     context.commit('UPDATEPOSTS', posts, now)
        //   })
        //   .catch(error => console.log(error))

        context.commit('UPDATEPOSTS', allPosts)
        console.log(stat)
        context.commit('SET_PERCENT', -1)
        context.commit('SET_PROCESSING', false)
        // Закончили обход
      })
        .catch(error => {
          context.commit('SET_PROCESSING', false)
          console.log(error.message)
        })
    }
  },
  mutations: {
    UPDATEFAVORITE (state, position) {
      state.posts[position].favorite = !state.posts[position].favorite
    },
    UPDATEPOST (state, position) {
      state.posts[position].favorite = !state.posts[position].favorite
      // alert(vue.$store.getters.GET_POST(post.id))
      // let a = context.getters.GET_POST(post.id)
      // state.posts. = posts
      // let a = state.posts.find(item => item.id === post.id)
      // console.log(state.posts[position].data().favorite)
    },
    UPDATEPOSTS (state, posts, lastUpdate) {
      state.posts = posts
      // console.log(state.posts)
      if (lastUpdate) {
        state.settings.lastUpdate = lastUpdate
      }
    }
  },
  getters: {
    GET_POST (state, id) {
      return state.posts.find(item => item.id === id)
    },
    allPosts (state) {
      return state.posts
    },
    filteredPosts (state, getters) {
      if (getters.getSearchKey) {
        return state.posts.filter(post => {
          let y = post.text.toLowerCase()
          // alert(post.data().text.toLowerCase())
          return y.includes(getters.getSearchKey.toLowerCase())
        })
      } else {
        if (state.posts.length > 500) {
          return state.posts.slice(0, 499)
        } else {
          return state.posts
        }
      }
    },
    getPostLength (state, getters) {
      if (state.posts) {
        return getters.allPosts.length
      } else {
        return 0
      }
    }

  }
}
