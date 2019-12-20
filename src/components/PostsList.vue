<template>
  <div class="PostsList">

    <Post v-for="(post, index) in filteredPosts" :key="post.id" :post="post" :index="index"></Post>

  </div>
</template>

<script>
// import vue from 'vue'
import Post from './Post'
import { mapGetters } from 'vuex' //, mapActions
// const { ipcRenderer } = window.require('electron')
// let unsubscribe

export default {
  name: 'PostsList',
  components: {
    Post
  },
  methods: {
    // ...mapActions(
    //   [ 'fetchPosts' ]
    // )
  },
  computed: {
    ...mapGetters(
      [ 'filteredPosts', 'getGroupsLength', 'getAllSettings', 'favoritesPosts' ]
    )
    // postsFiltered () {
    //   return this.$store.getters.postsFiltered
    // }
  },
  async mounted () {
    // this.$store.dispatch('fetchPostsfromBD')
    if (this.favoritesPosts.length === 0) {
      this.$store.dispatch('fetchFavoritesPostsfromBD')
    }
    if (this.getGroupsLength === 0) {
      await this.$store.dispatch('fetchGroupsfromBD')
    }
    if (this.getGroupsLength !== 0 && typeof this.getAllSettings.length === 'undefined') {
      await this.$store.dispatch('fetchSettingsfromBD')
    }
  },
  created () {
    /* eslint-disable no-console СЛЕДИМ ЗА ИЗМЕНЕНИЯМИ В ПОСТАХ */
    // vue.$db.collection('posts').orderBy('date', 'desc').onSnapshot(snapshot => {
    //   snapshot.docChanges().forEach(change => {
    //     if (change.type === 'added') {
    //       const post = { ...change.doc.data(), id: change.doc.id }
    //       console.log('post was added: ', post)
    //
    //       // this.posts[this.posts.length - 1] = post
    //     }
    //     if (change.type === 'modified') {
    //       console.log('post was updated')
    //       const updatedpost = this.filteredPosts.find(
    //         post => post.id === change.doc.id
    //       )
    //       updatedpost.text = change.doc.data().text
    //
    //       console.log('post was updated: ', updatedpost)
    //     }
    //     if (change.type === 'removed') {
    //       const deletedpost = this.posts.find( // Удалить этот документ из store!!!!!!!!!!!!!!!!!!!!!!!!
    //         post => post.id === change.doc.id
    //       )
    //       console.log('post was removed: ', deletedpost)
    //
    //       const index = this.posts.indexOf(deletedpost)
    //       this.posts.splice(index, 1)
    //       this.index = this.index === 0 ? 0 : index - 1
    //     }
    //   })
    // })
    /* eslint-enable no-console */
  },
  destroyed () {
    // unsubscribe()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.PostsList{
  padding: 0 20px;
  overflow-x: hidden;
}

</style>
