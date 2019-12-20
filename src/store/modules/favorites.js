import vue from 'vue'
// import M from 'materialize-css/dist/js/materialize.js'
// import { ipcRenderer } from 'electron'
// const easyvk = window.require('easyvk') // API Вконтакте

export default {
  state: {
    favorites: []
  },
  actions: {
    async addToFavorite (context, post) {
      if (post.favorite === true) {
        await vue.$db.collection('posts')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              if (post.id === doc.data().id) {
                doc.ref.delete()
              }
            })
          })
        if (context.getters.allPosts.length > 0) {
          let position = await context.getters.allPosts.findIndex(item => item.id === post.id)
          context.commit('UPDATEFAVORITE', position)
        }
        let favposition = await context.getters.favoritesPosts.findIndex(item => item.id === post.id)
        context.commit('DELLFAVORITE', favposition)
      } else {
        let newPost = Object.assign({}, post)
        newPost.favorite = true
        await vue.$db.collection('posts').doc().set(newPost)
        let position = await context.getters.allPosts.findIndex(item => item.id === post.id)
        context.commit('UPDATEFAVORITE', position)
      }
    },
    async fetchFavoritesPostsfromBD ({ commit }) {
      commit('SET_PROCESSING', true)
      let posts = []
      await vue.$db.collection('posts')
        .orderBy('date', 'desc')
        .get()
        .then(QuerySnapshot => {
          QuerySnapshot.forEach(item => {
            let post = item.data()
            // post.id = item.id
            posts.push(post)
          })
          // Posts = QuerySnapshot.docs
          commit('UPDATEFAVORITEPOSTS', posts)
        })
        .catch(error => console.log(error))
      commit('SET_PROCESSING', false)
    }
  },
  mutations: {
    DELLFAVORITE (state, position) {
      state.favorites.splice(position, 1)
    },
    // UPDATEFAVORITE (state, position) {
    //   console.log('ya tut', position)
    //   state.posts[position].favorite = !state.posts[position].favorite
    // },
    UPDATEFAVORITEPOSTS (state, posts) {
      state.favorites = posts
    }
  },
  getters: {
    favoritesPosts (state) {
      return state.favorites
    }
  }
}
