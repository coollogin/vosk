<template>
  <div class="Updater">
    <a href="#" @click="Update" class="" >  <i class="small material-icons">autorenew</i></a>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Updater',
  props: {
    // post: {
    //   type: Object,
    //   required: true
    // },
    // index: {
    //   type: Number,
    //   required: true
    // }
    // msg: String
  },
  methods: {
    ...mapActions(
      [ 'SavePosts' ]
    ),
    Update () {
      if (!this.getProcessing) {
        this.SavePosts()
      // M.toast({ html: 'Данные загружены', classes: 'green' })
      }
    }
  },
  computed: {
    ...mapGetters(
      ['getProcessing']
    )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a{
  color: #d2d1d3;
}
a:hover{
  color: #039be5}
</style>
