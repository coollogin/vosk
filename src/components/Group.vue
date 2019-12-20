<template>
      <!-- li class="collection-item avatar">
        <img src="https://sun9-13.userapi.com/c636529/v636529903/5d015/Yk4GiPo-AT8.jpg?ava=1" alt="" class="circle">
        <span class="title">{{group.name}}</span>
        <p>{{group.text}} <br>
        </p>
        <a href="#!" class="secondary-content"><i class="material-icons">do_not_disturb_on</i></a>
      </li -->
      <div class="chip">
        {{group.label}}
        <i class="close material-icons" @click.prevent="delGroup(group.id)" >close</i>
      </div>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  name: 'Group',
  props: {
    group: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
    // msg: String
  },
  data () {
    return {
      'id': this.group._id,
      'label': this.group.label
      // 'text': this.group.text
    }
  },
  methods: {
    delGroup (id) {
      // console.log(id)
      this.$store.dispatch('deleteGroup', id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

li{
  //margin: 0 0 5px !important;
  opacity: 0.6;
  //background-color: #ccc !important;
}
li:hover{
  opacity: 0.9;
}
i{
  color: red;
  opacity: 0.7;
}

</style>
