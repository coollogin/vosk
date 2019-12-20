<template>
  <div class="posts">
    <!-- h1>Страница постов</h1 -->
    <Posts-List></Posts-List>
  </div>
</template>

<script>
// @ is an alias to /src
import PostsList from '@/components/PostsList.vue'

export default {
  name: 'PostsView',
  components: {
    PostsList
  }
}
</script>
