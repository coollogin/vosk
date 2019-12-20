<template>
  <div class="loginFormWrap">
    <form>
      <div >
        <input placeholder="Login" value="" name="username" v-model="username">
        <input type="password" placeholder="Password" value="" name="password" v-model="password">
        <br>
        <p>
          <label>
            <input type="checkbox" name="savesassion" class="filled-in" checked="checked" v-model="savesassion" />
            <span>Запомнить меня</span>
          </label>
        </p>
        <br>
        <div class="btn" @click.prevent="login">Войти</div>
      </div>
    </form>
  </div>
</template>

<script>
// import { mapMutations } from 'vuex'
import M from 'materialize-css/dist/js/materialize.js'
const easyvk = window.require('easyvk') // API Вконтакте
export default {
  name: 'loginForm',
  // props: {
  //   msg: String
  // },
  components: {
    // Post
  },
  data () {
    return {
      username: '',
      password: '',
      savesassion: true
    }
  },
  methods: {
    // ...mapMutations(
    //   ['updateisAuthorized']
    // ),
    login () {
      // this.$store.dispatch('retrieveToken', {
      //   username: this.username,
      //   password: this.password,
      //   savesassion: this.savesassion
      // })
      // M.toast({ html: 'Вы авторизованы' })
      // this.$router.push('/posts')
      // if (this.vklogin === '') { alert('Введите имя пользователя!'); return }
      // if (this.vkpass === '') { alert('Введите пароль!'); return }
      easyvk({
        username: this.username,
        password: this.password,
        fields: ['photo_50', 'username'],
        save_session: true,
        session_file: '.my-session'
      })
        .then(async vk => {
          if (vk.session.user_id) {
            // this.auth = true
          } else {
            // alert('Ошибка авторизации! Проверьте имя пользователя и пароль.')
            throw new Error()
          }
          // Информация о пользователе
          // let me = vk.session.user_id
          // console.log(vk.session)
          // let { vkr } = await vk.call('account.getProfileInfo')
          // console.log(vkr)
          // M.toast({ html: 'Вы авторизованы', classes: 'freen' })
          await this.$store.commit('SETUSERINFO', {
            user_id: vk.session.user_id,
            first_name: vk.session.first_name,
            last_name: vk.session.last_name,
            username: vk.session.username,
            avatar: vk.session.photo_50
          })
          // this.username = vkr.first_name
          // this.status = 'Добрый день, ' + vkr.first_name + '! Вы успешно авторизованы. Удачной охоты! =)'
        })
        .then(async () => {
          await this.$store.dispatch('changeAuthStatus', true)
          this.$router.push('/posts')
          // M.toast({ html: 'Вы авторизованы', classes: 'freen' })
        })
        .catch(() => {
          M.toast({ html: 'Ошибка авторизации!', classes: 'red' })
          // console.log('Ошибка!')
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.loginFormWrap{
    text-align: center;
}
form{
  margin: 0 auto;
  width: 300px;

  input {
    color: #fff;
  }
}
</style>
