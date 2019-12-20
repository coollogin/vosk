<template>
  <div class="Updater">
    <a href="#" @click="Cancel" class="" >  <i class="small material-icons">block</i></a>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Cancel',
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
    // ...mapActions(['SetStop' ]),
    ...mapMutations(['SET_STOP']),
    Cancel () {
      if (this.getProcessing) {
        this.SET_STOP(true)
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
  color: red;
  // opacity: 1;
  // box-shadow: 3px 3px 5px #333;
}
</style>
