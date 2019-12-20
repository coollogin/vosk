<template>
  <div class="favoritesPosts">

    <Post v-for="(post, index) in favoritesPosts" :key="index" :post="post" :index="index"></Post>

  </div>
</template>

<script>
import Post from './Post'
import { mapGetters } from 'vuex' //, mapActions
// const { ipcRenderer } = window.require('electron')

export default {
  name: 'Favorites',
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
      [ 'favoritesPosts', 'getGroupsLength', 'getAllSettings' ]
    )
    // postsFiltered () {
    //   return this.$store.getters.postsFiltered
    // }
  },
  mounted () {
    if (this.favoritesPosts.length === 0) {
      this.$store.dispatch('fetchFavoritesPostsfromBD')
    }
    if (this.getGroupsLength === 0) {
      this.$store.dispatch('fetchGroupsfromBD')
    }
    if (this.getGroupsLength !== 0 && typeof this.getAllSettings.length === 'undefined') {
      this.$store.dispatch('fetchSettingsfromBD')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.favoritesPosts{
  padding: 0 20px;
  overflow-x: hidden;
}

</style>
