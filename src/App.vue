<template>
  <div id="App">

    <Main-Sidebar v-if="getAuthorizationStatus"></Main-Sidebar>

    <div id="canva">

    <Main-Header v-if="getAuthorizationStatus"></Main-Header>

    <main :style="$route.name == 'login' ? 'margin-top: 0' : 'margin-top: 50px'">
      <router-view/>

      <div v-if="!isProgress">
          <!-- <form v-if="!auth">
            <div class="col s3"></div>
            <div class="col s6">
              <input placeholder="Login" value="" v-model="vklogin">
              <input type="password" placeholder="Password" value="" v-model="vkpass">
              <div class="btn" @click.prevent="logInVK">Войти</div>
            </div>
          </form> -->
      </div>

    </main>

  <footer>
    <div class="status col s10" >Статус: <span> {{status}} </span> </div>

    <div class="progress" v-if="isProgress">
      <div class="indeterminate"></div>
    </div>

  </footer>

</div>
</div>
 <!-- End App -->
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import MainSidebar from './components/MainSidebar'
import MainHeader from './components/MainHeader'
import M from 'materialize-css/dist/js/materialize.js'
const { ipcRenderer } = window.require('electron')

// import mongoose from 'mongoose'
// const mongoose = require('mongoose')
// import PostsList from './components/PostsList'
// const { ipcRenderer } = window.require('electron')
const fs = window.require('fs') // Для работы с файлами
const easyvk = window.require('easyvk') // API Вконтакте
// const { dialog } = window.require('electron').remote  Для окна поиска файлов
const shell = window.require('electron').shell // Для открытия внешних ссылок

export default {
  name: 'VK_graber',
  components: {
    MainSidebar, MainHeader
  },
  data () {
    return {
      ni: '',
      auth: false,
      username: '',
      findKey: '',
      session: {},
      password: '',
      settings: { days: 7, posts: 10, delay: 1 },
      groups: [], //, 'sch283'
      posts: [], // {group: "Группа", date: "дата", text: "Текст", link: "ссылка"}
      postsArray: [], // Не сортированный массив постов
      isProgress: false,
      showUpdateLabel: false,
      status: 'Нужно авторизоваться!',
      errorsArray: [],
      iterations: 0,
      t: 0 // номер текущего токена в массиве
    }
  },
  computed:
    mapGetters(
      [ 'getAuthorizationStatus', 'getGroupsLength' ]
    ),
  methods: {
    ...mapMutations(['UPDATEGROUPS', 'UPDATEPOSTS', 'SETUSERINFO', 'SET_PROCESSING']),
    openLink (ilink) {
      shell.openExternal(ilink)
    }
  },
  async mounted () {
    // await this.$store.dispatch('fetchGroupsfromBD')
    // await this.$store.dispatch('addStatsToBD')
    await this.$store.dispatch('fetchFavoritesPostsfromBD')
    if (this.getGroupsLength !== 0) {
      // await this.$store.dispatch('fetchSettingsfromBD')
    }
    // this.SET_PROCESSING(true)
    ipcRenderer.on('DownLoadBD', (event, bd) => {
      console.log('----------------Load from BD------------------')
      console.log(bd)
      if (bd.Groups) {
        this.$store.dispatch('fetchGroupsfromBD', bd.Groups)
      }
      if (bd.Posts) {
        this.$store.dispatch('fetchPostsfromBD', bd.Posts)
      }
      if (bd.Settings) {
        this.$store.dispatch('fetchSettingsfromBD', bd.Settings)
      }
      bd = {}
      if (this.getAuthorizationStatus) {
        M.toast({ html: 'Данные обновленны', classes: 'green' })
      }
    })

    M.AutoInit()
    // ipcRenderer.on('DownLoadPosts', (event, data) => {
    //   console.log(data)
    //   // this.UPDATEPOSTS
    //   this.$store.commit('UPDATEPOSTS')
    //   M.toast({ html: 'Данные загружены' })
    // })

    // this.$store.dispatch('SIGNIN', { email: 'houseofcool@ya.ru', password: 'VoskProgramm' })

    // async function start () {
    //   try {
    //     await mongoose.connect(
    //       'mongodb+srv://houseofcool:Vosk12345@houseofcoolcluster-ouqib.mongodb.net/voskdb',
    //       {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: false
    //       })
    //     console.log('Okey')
    //   } catch (error) {
    //     console.log(error.message)
    //   }
    // }
    // start()
    //  Загружаем сессию
    fs.readFile('.my-session', (err, data) => {
      if (err) {
        console.error(err)
      } else if (data) {
        this.session = JSON.parse(data.toString())
        // console.log(this.session.access_token)
        if (this.session.user_id) {
          easyvk({
            access_token: this.session.access_token,
            fields: ['photo_50', 'username']
          }).then(async vk => {
            if (vk.session.user_id) {
              // M.toast({ html: 'Проскачили =)', classes: 'green' })
              console.log(vk.session)
              await this.$store.commit('SETUSERINFO', {
                id: vk.session.user_id,
                first_name: vk.session.first_name,
                last_name: vk.session.last_name,
                username: vk.session.username,
                avatar: vk.session.photo_50
              })
              await this.$store.dispatch('changeAuthStatus', true)
              this.$router.push('/posts')
            } else {
              alert('Ошибка авторизации! Проверьте имя пользователя и пароль.')
            }
          })
        } // End if session
      }
    }) // End Read file
  }

}
</script>

<style lang="scss">
  html{
      height: 100%;
  }
  body{
    height: 100%;
  }
  #App{
    height: 100%;
    background-color: #333;
  }

  #canva {
    display: flex;
    background-color: #ccc;
    height: 100%;
    width: auto;
    overflow: hidden;  /*makes the body non-scrollable (we will add scrolling to the sidebar and main content containers)*/
    margin: 0px;  /*removes default style*/
    box-sizing: border-box;
    flex-direction: column;
  }

  main{
    width: auto;
    flex:1;
    // padding: 15px;
    margin: 50px 0 0;
    background-color: #555361;
    overflow-x: auto;
  }
  footer{
    position: fixed;
    bottom: 0;
    height: 0;
    width: 100%;
    background-color: #555361;
  }

  h1{
    font-size: 28px !important;
    color: #ccc;
    margin-top: 0 !important;
  }
  #toast-container{
    top: 10% !important;
    right: 5% !important;
    bottom: auto !important;
    left: auto !important;
    // top: auto !important;
    // right: auto !important;
    // bottom: 10%;
    // left:7%;
    .green{
      background-color: green;
    }
    .red{
      background-color: red;
    }
  }
</style>
