<template>
  <div class="GroupsList">
    <ul class="collection">
      <Group v-for="(group, index) in allGroups" :key="group.id" :group="group" :index="index"></Group>
    </ul>
  </div>
</template>
<script>
import Group from './Group'
// import M from 'materialize-css/dist/js/materialize.js'
import { mapGetters, mapActions } from 'vuex' //, mapActions
// const { ipcRenderer } = window.require('electron')

export default {
  name: 'GroupsList',
  components: {
    Group
  },
  methods: {
    ...mapActions(
      [ 'updateNumGroups' ]
    )
  },
  computed: {
    ...mapGetters(
      [ 'allGroups', 'getGroupsLength', 'getAllSettings' ]
    )
    // postsFiltered () {
    //   return this.$store.getters.postsFiltered
    // }
  },
  async mounted () {
    if (this.getGroupsLength === 0) {
      await this.$store.dispatch('fetchGroupsfromBD')
    }
    if (this.getGroupsLength !== 0 && typeof this.getAllSettings.length === 'undefined') {
      await this.$store.dispatch('fetchSettingsfromBD')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.GroupsList{
  padding: 20px;
}
ul{
  border: none !important;
  margin: 0 !important;
}

</style>
