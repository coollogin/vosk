<template>
  <div class="favorites">
    <Favorites></Favorites>
  </div>
</template>
<script>
// @ is an alias to /src
import Favorites from '@/components/Favorites.vue'

export default {
  name: 'FavoritesView',
  components: {
    Favorites
  }
}
</script>
