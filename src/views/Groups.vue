<template>
  <div class="groups">
    <!--h1>Управление Группами ВК</h1-->
    <Groups-List></Groups-List>
  </div>
</template>

<script>
// @ is an alias to /src
import GroupsList from '@/components/GroupsList.vue'

export default {
  name: 'GroupsView',
  components: {
    GroupsList
  }
}
</script>
