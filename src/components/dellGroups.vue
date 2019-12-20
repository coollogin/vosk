<template>
  <div class="dellGroups">
    <a href="#" @click="dellGroups">   <i class="small material-icons">delete_forever</i></a>
  </div>
</template>

<script>
import store from '../store/store'

export default {
  name: 'dellGroups',
  props: {
  },
  data () {
    return {
    }
  },
  methods: {
    dellGroups () {
      store.dispatch('dellAllGroups')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a{
  color: #d2d1d3;
}
a:hover{
  color: red
}
</style>
