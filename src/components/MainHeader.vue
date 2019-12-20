<template>
  <div class="MainHeader">
    <div class="updateLabel">Доступно обновление!</div>
    <div class="wrap">
      <div class="bt-container">
        <div v-if="$route.name == 'posts' && getProcessing" class="ibtn">
            <Cancel title="Остановить задание"></Cancel>
        </div>
        <div v-if="$route.name == 'posts' && !getProcessing" class="ibtn">
            <Updater title="Обновить посты"></Updater>
        </div>
        <div class="percent" v-if="$route.name == 'posts' && getProcessing && getPercent != -1">{{getPercent}} {{" %"}}</div>
        <div v-if="$route.name == 'groups'" class="ibtn">
            <addGroup title="Добавить группу ВК" ></addGroup>
        </div>
        <div v-if="$route.name == 'groups'" class="ibtn">
            <addGroupsList title="Добавить список групп из файла"></addGroupsList>
        </div>
        <div v-if="$route.name == 'groups'" class="ibtn">
            <dellGroups title="Удалить все группы"></dellGroups>
        </div>
      </div>

      <div class="info-container">
        <span class="tooltipped1" title="Загружено групп"><i class="tiny material-icons">assignment</i> {{getGroupsLength}} </span>
        <span class="tooltipped1" title="Найдено постов"><i class="tiny material-icons">receipt</i> {{getPostLength}} </span>
        <!-- span class="tooltipped1" title="Последнее обновление данных"><i class="tiny material-icons">access_time</i> {{calculateTime}} </span -->
      </div>

      <div class="user-container">
        <div class="user" >
          <div class="" id="logout" @click="logOut" v-if="!getProcessing">
            <i class="close tiny material-icons" @click="delGroup(group._id)" >close</i>
          </div>
          <a class="">
            <img :src="getUserInfo.avatar" :title="getUserInfo.first_name" />
          </a>
          <!--ul>
            <li><a class="btn-floating yellow"><i class="material-icons">exit_to_app</i></a></li>
          </ul-->
        </div>
      </div>
    </div>

    <div class="progress" v-if="getProcessing">
      <div class="indeterminate"></div>
    </div>
  </div>
</template>

<script>
import Updater from './Updater'
import Cancel from './Cancel'
import addGroup from './addGroup'
import addGroupsList from './addGroupsList'
import dellGroups from './dellGroups'
import { mapGetters, mapActions } from 'vuex'
import M from 'materialize-css/dist/js/materialize.js'
const fs = window.require('fs') // Для работы с файлами
const easyvk = window.require('easyvk') // API Вконтакте

export default {
  name: 'MainHeader',
  data () {
    return {
      timeNow: new Date(),
      newGroup: ''
    }
  },
  components: {
    Updater, Cancel, addGroup, addGroupsList, dellGroups
  },
  methods: {
    ...mapActions(
      [ 'fetchPostsfromBD' ]
    ),
    logOut () {
      // console.log('LogOut')
      // console.log(this.getUserInfo)
      easyvk({ clean_session: true }).then(async vk => {
        // console.log(vk.session)
        await fs.unlink('.my-session', function (err) {
          if (err) {
            // console.log(err)
          } else {
            // console.log('Файл удалён')
          }
        })
        vk.session.clear()
        // console.log(vk.session)
        await this.$store.dispatch('changeAuthStatus', false)
        this.$router.push('/login')
      })
    }
  },
  computed: {
    ...mapGetters(
      [ 'getAuthorizationStatus', 'getGroupsLength', 'getPostLength', 'getUserInfo', 'getAllSettings', 'getProcessing', 'getPercent' ]
    ),
    calculateTime () {
      if (this.getAllSettings && typeof this.getAllSettings.lastUpdate !== 'undefined') {
        let t1 = this.timeNow.getTime()
        let t2 = this.getAllSettings.lastUpdate.toMillis() // Date.parse(this.getAllSettings[0].lastUpdate)
        let t3 = (t1 - t2) / (1000 * 60 * 60)
        let t4 = (t1 - t2) / (1000 * 60)
        // console.log(t1)
        return Math.floor(t3) < 1 ? Math.floor(t4) + ' мин.' : Math.floor(t3) + ' ч.'
      } else {
        return 0
      }
    }
    // postsFiltered () {
    //  return this.$store.getters.postsFiltered
    // }
  },
  mounted () {
    // this.$store.dispatch('test')
    // setInterval(() => {
    //   let now = new Date()
    //   let d1 = now.setHours(0, 0, 0, 0) / 1000
    //   console.log(d1)
    // }, 2000)
    // let a1 = this.timeNow.getTime()
    // let a2 = this.getAllSettings.lastUpdate.toMillis()
    // let a3 = (a1 - a2) / (1000 * 60)
    // console.log(a3)
    setInterval(() => { this.timeNow = new Date() }, 60000)
    // console.log(this.getAllSettings[0].lastUpdate)
    document.addEventListener('DOMContentLoaded', function () {
      let elems = document.querySelectorAll('.user')
      M.FloatingActionButton.init(elems, { direction: 'left', hoverEnabled: false }) //, hoverEnabled: false
    })
    document.addEventListener('DOMContentLoaded', function () {
      let ely = document.querySelectorAll('.tooltipped')
      M.Tooltip.init(ely)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.MainHeader{
  position: fixed;
  height: 50px;
  width: 800px;
  top: 0;
  opacity: 0.9;
  z-index: 10;

  .wrap{
    //background-color: yellow;
    position: relative;
    display: flex;
    flex-direction: row;
    height: 100%;
    padding: 8px 30px;
    background-color: #555361;
    border-bottom: solid 1px #5a5a65;
  }

}

.bt-container{
  flex: 0 0 30%;
  // background-color: red;
  display: flex;
  flex-direction: row;

  .ibtn{
      margin-right: 14px;
  }
}

.info-container{
  flex: 0 0 40%;
  // background-color: blue;
  display: flex;
  flex-direction: row;
  align-items: center;

  span{
    margin-right: 30px;
    vertical-align: middle;
    margin: 6px 20px;
    color: #d2d1d3;
    cursor: default;
  }

}

.user-container{
  display: flex;
  flex-direction: row-reverse;
  flex: 0 0 30%;
  // background-color: green;
  align-items: center;
}

.progress{
  margin: 0;
  z-index: 100;
  background-color: #82d5ff !important;
  .indeterminate {
    background-color: #039be5 !important;
  }
}

.user{
  position: relative;
  margin-top: 5px;

  img{
    height: 35px;
    width: 35px;
    border-radius: 50%;
    border: solid 1px #777;
    // border: solid 1px #555;
  }
  opacity: 1;
}

#logout{
  display: block;
  position: absolute;
  padding: 0 3px;
  top: -7px;
  right: -7px;
  border: solid 1px #999;
  border-radius: 50%;
  background-color: #777;
  opacity: 0.7;
  cursor: pointer;

   &:hover{
     opacity: 1;
     color: #fff;
   }

  i{
    font-size: 12px !important;
    padding-top: 4px;
  }
}

.updateLabel{
    display: none;
    position: absolute;
    top: 0px;
    right: 140px;
    //width: 175px;
    // height: 45px;
    background-color: red;
    border-radius: 0 0 30% 30%;
    box-shadow: 5px 5px 10px #333;
    padding: 4px 10px 12px;
    text-align: сcenter;
    color: #fff;
    opacity: 0.9;
    z-index: 100;
}
.percent{
  padding: 5px;
  font-weight: bold;
  color: #039be5;
}
</style>
