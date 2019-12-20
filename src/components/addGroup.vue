<template>
  <div class="addGroup">
    <a href="#" @onclick.prevent="openModal" class="modal-trigger" data-target="modalAddGroup"> <i class="small material-icons">add_box</i></a>
  </div>
</template>

<script>
import M from 'materialize-css/dist/js/materialize.js'
// import { mapActions } from 'vuex'
// import { mapGetters } from 'vuex'
export default {
  name: 'addGroup',
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
    openModal () {
      let elems = document.querySelectorAll('.modal')
      M.Modal.init(elems, {})
    }
  },
  async mounted () {
    M.AutoInit()
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
