<template>
  <div class="MainSidebar">

    <aside>
      <div id ="name">
        VosK
      </div>
      <div class="search">
        <input :disabled="$route.name == 'posts' ? false : true" type="search" name="search" :value="getSearchKey" placeholder="Текст для поиска" @input="updateSearchKey" >
      </div>

      <div id ="menu"><i class=" material-icons">d_rotation</i>
        <router-link to="/posts"><i class="small material-icons">receipt</i>Посты <div class="spot"></div></router-link>
        <router-link to="/favorites"><i class="small material-icons">bookmark</i>Избранное <div class="spot"></div></router-link>
        <router-link to="/groups"><i class="small material-icons">assignment</i>Группы <div class="spot"></div></router-link>
        <router-link to="/stats"><i class="small material-icons">poll</i>Статистика <div class="spot"></div></router-link>
        <router-link to="/settings"><i class="small material-icons">settings_applications</i>Настройки <div class="spot"></div></router-link>
      </div>

    </aside>

    <router-link to="/about" ></router-link>
      <a href="#" @onclick.prevent="openModal" class="info modal-trigger" data-target="modalAbout" ><i class="tiny material-icons">contact_support</i></a>

      <!-- Modal Structure -->
      <div id="modalAbout" class="modal">
        <div class="modal-content">
          <h3>Программа <span>VosK</span></h3>
          <h6>Верчия программы: 2.0.4</h6>
          <img id="logo" src="../../build/logo.png" alt="лого">
          <p>Программа предназначена для удобного поиска актульных постов в группах социальной сети ВКонтакте.</p>
          <p>Разработана специально для ГКУ Дирекция ДОГМ.</p>

          <ul>
              <h6>Автор: <b>Сергей Кулагин</b></h6>
              <li><b>Site:</b> www.houseofcool.ru</li>
              <li><b>Email:</b> houseofcool@ya.ru</li>
          </ul>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn">Ok</a>
        </div>
      </div>

      <!-- Modal Structure -->
      <div id="modalAddGroup" class="modal">
        <div class="modal-footer">
          <a href="#" class="modal-close"><i class="close material-icons">close</i></a>
        </div>

        <div class="modal-content">
          <form class="">
              <input type="text" name="newGroup" value="" placeholder="Укажите имя Группы" v-model="newGroup" >
          </form>
          <br>
          <div class="btn" @click="saveGroupsMethod">Добавить</div>
        </div>

      </div>
      <!--End Modal Structure -->

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import M from 'materialize-css/dist/js/materialize.js'

export default {
  name: 'MainSidebar',
  components: {

  },
  data () {
    return {
      newGroup: ''
    }
  },
  methods: {
    ...mapActions(
      [ 'fetchPostsfromBD', 'saveGroups' ]
    ),
    updateSearchKey (e) {
      this.$store.commit('updateSearchKey', e.target.value)
    },
    openModal () {
      let elems = document.querySelectorAll('.modal')
      M.Modal.init(elems, {})
    },
    saveGroupsMethod () {
      this.$store.dispatch('saveGroups', [this.newGroup])
      let el = document.querySelector('#modalAddGroup')
      let instance = M.Modal.getInstance(el)
      instance.close()
      this.newGroup = ''
      // console.log(modal)
    }
  },
  computed: {
    ...mapGetters(
      [ 'getAuthorizationStatus', 'getSearchKey' ]
    )
    // postsFiltered () {
    //   return this.$store.getters.postsFiltered
    // }
  },
  async mounted () {
    M.AutoInit()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#name{
  padding: 0 10px 0;
}
.MainSidebar{
  position: relative;
  height: 100%;
  float: left;
}
aside{
  padding: 0px 0px 5px;

  background-color: #2d2a33;
  height: 100%;
  width: 200px;
  overflow: hidden;
}
#menu{
  display: flex;
  margin-top: 30px;
  flex-direction: column;

  a{
    display: flex;
    align-items: center;
    color: #d2d1d3;
    padding: 10px;
    margin-bottom: 12px;
  }

  a:hover{
    background-color: #039be5;
    opacity: 0.9;
  }
  a:hover.router-link-active .spot{
    background: blue;
    opacity: 0.4;
  }

  i{
    margin: 0 10px 0 15px;
    color: #d2d1d3;
  }
  .router-link-active .spot{
     display: block;
     position: absolute;
     right: 20px;
     //margin: 0 0.5em;
     width: 0.4em;
     height: 0.4em;
     background: #039be5;
     border-radius: 100px;
  }

}

#name{
  display: block;
  width: 100%;
  text-align: right;
  color: #999999;
  font-size: 36px;
  font-weight: bold;
}

a.info{
  position: absolute;
  width: 10px;
  height: 10px;
  right: 10px;
  bottom: 15px;
  display: block;
  color: #d2d1d3;
  opacity: 0.7;
  z-index: 15;
}

a.info:hover{
  color: #039be5;
}

.search{
  display: block;
  width: 100%;
  margin-top: 30px;
  text-align: center;

  input{
    width: 76% !important;
    background: #323232!important;
    border-radius: 10px !important;
    padding: 0 15px!important;
    color: #fff;
  }

  input[type="search"]::placeholder {
    text-align: center;
    color: #555;
  }
  input[type="search"]:focus {
    border-bottom: 1px solid #039be5 !important;
    box-shadow: 0 1px 0 0 #039be5 !important;
  }

}
.modal .btn{
  background-color: #039be5;
  &:hover{
    background-color: #0276b0;
  }
}

#modalAbout{
  h3{
    font-size: 28px;
    margin-bottom: 0px;
    color: #444;

    span{
      font-size: 36px;
      font-weight: bold !important;
    }
  }

  .modal-footer{
    text-align: center !important;
  }

  h5{
    margin-top: 30px;
  }
  h5, li{
    color: #555;
  }
  h6{color: #777; margin-bottom: 6px;}
}

#modalAddGroup{
  text-align: center;

  a{
    color: #333;
  }
}

#logo{
  float: right;
  width: 120px;

}
</style>
