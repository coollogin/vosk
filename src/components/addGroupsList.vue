<template>
  <div class="addGroupsList">
    <a href="#" @click="addGroupsList">   <i class="small material-icons">insert_drive_file</i></a>
  </div>
</template>

<script>
import store from '../store/store'
import M from 'materialize-css/dist/js/materialize.js'
// import { mapGetters } from 'vuex'
// import { mapActions } from 'vuex'
const fs = window.require('fs') // Для работы с файлами
const { dialog } = window.require('electron').remote

export default {
  name: 'addGroupsList',
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
  data () {
    return {
    }
  },
  methods: {
    addGroupsList () {
      dialog.showOpenDialog({ filters: [{ name: 'Groups VK', extensions: ['txt'] }], properties: ['openFile'] },
        function (fileName) {
          // console.log(fileName[0])
          if (fileName[0] === 'undefined') {
          // console.log('No file selected')
          } else {
            fs.readFile(fileName[0], (err, data) => {
              if (err) {
                M.toast({ html: 'Файл не найден', classes: 'red' })
                // console.error(err)
              }
              let array = data.toString().split('\n')
              let arrayFiltered = array.map((el) => el.replace('\r', '')).filter(el => el !== '')
              store.dispatch('saveGroups', arrayFiltered)
              // console.log(arrayFiltered.length)
            })
          }
        }) // End dialog file
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
  color: #039be5}

</style>
