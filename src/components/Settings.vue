<template>
  <div class="Settings">

    <form class="">
      <div class="row">
        <div class="input-field col s12">
          <textarea id="minusWords" class="materialize-textarea" @focus="onFocus" @focusout="saveMinusWords" v-model="getAllSettings.minusWords"></textarea>
          <p class="minusWords">Например: #реклама #щенок #обувь</p>
          <label for="minusWords">Минус слова</label>
        </div>
      </div>
    </form>

    <div class="row">
      <div class="delay">
        <h5>Пауза между запросами:</h5>
        <form >
          <p>
            <label>
              <input name="delay" type="radio" value="0.6" @click="alert($event)" v-model="getAllSettings.delay" />
              <span>0.6 сек.</span>
            </label>
          </p>
          <p>
            <label>
              <input name="delay" type="radio" checked value="1" @click="alert($event)" v-model="getAllSettings.delay" />
              <span>1 сек.</span>
            </label>
          </p>
          <p>
            <label>
              <input name="delay" type="radio" value="2" @click="alert($event)" v-model="getAllSettings.delay" />
              <span>2 сек.</span>
            </label>
          </p>
          <br>
        </form>
        <p>Чем больше пауза, тем стабильней будет работать программа, но увеличится время ожидания.</p>
      </div>

      <div class="period">
        <h5>За какой период искать Посты:</h5>
        <form >
          <p>
            <label>
              <input name="period" type="radio" checked value="7" @click="alert($event)" v-model="getAllSettings.period" />
              <span>7 дней</span>
            </label>
          </p>
          <p>
            <label>
              <input name="period" type="radio" value="5" v-model="getAllSettings.period" @click="alert($event)" />
              <span>5 дней</span>
            </label>
          </p>
          <p>
            <label>
              <input name="period" type="radio" value="3" v-model="getAllSettings.period" @click="alert($event)"/>
              <span>3 дня</span>
            </label>
          </p>
          <p>
            <label>
              <input name="period" type="radio" value="1" v-model="getAllSettings.period" @click="alert($event)"/>
              <span>1 день</span>
            </label>
          </p>
        </form>
        <p>Уменьшая период, за который нужно получить актуальные посты, можно ускорить сбор данных.</p>
      </div>
    </div>

    <div class="postsForGroup">
      <h5>Количество постов на Группу</h5>
      <form>
        <p>
          <label>
            <input name="postsForGroup" type="radio" value="20" @click="alert($event)" v-model="getAllSettings.postsForGroup" />
            <span>20 Постов</span>
          </label>
        </p>
        <p>
          <label>
            <input name="postsForGroup" type="radio" checked value="15" @click="alert($event)" v-model="getAllSettings.postsForGroup"/>
            <span>15 Постов</span>
          </label>
        </p>
        <p>
          <label>
            <input name="postsForGroup" type="radio" value="10" @click="alert($event)" v-model="getAllSettings.postsForGroup" />
            <span>10 Постов</span>
          </label>
        </p>
        <p>
          <label>
            <input name="postsForGroup" type="radio" value="5" @click="alert($event)" v-model="getAllSettings.postsForGroup" />
            <span>5 Постов</span>
          </label>
        </p>
      </form>
      <p>Уменьшая этот параметр можно значительно снизить нагрузку на процессор и память, а также передаваемый по сети трафик.</p>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex' //, mapActions
import M from 'materialize-css/dist/js/materialize.js'

export default {
  name: 'Settings',
  data () {
    return {
      buffer: ''
    }
  },
  methods: {
    ...mapActions(
      [ 'saveMinusWords' ]
    ),
    alert (e) {
      // setTimeout(() => { alert(this.getAllSettings[0].period) }, 1000)
      // alert(this.getAllSettings[0].period)
      // alert(e.target.name + '=' + e.target.value)
      // console.log(e.target)
    },
    onFocus (e) {
      this.buffer = e.target.value
    },
    saveMinusWords (e) {
      // let result = e.target.value.replace(/\s+/g, '').split('#').filter(item => item !== '')
      if (this.buffer !== e.target.value) {
        let result = e.target.value.replace(/\s+/g, '')
        console.log(result)
        this.$store.dispatch('saveMinusWords', result)
      }
    }
    // ...mapActions(
    //   [ 'fetchPosts' ]
    // )
  },
  computed: {
    ...mapGetters(
      ['getAllSettings', 'getGroupsLength']
    )
  },
  async mounted () {
    // console.log(typeof this.getAllSettings.length)
    // console.log(this.getAllSettings)
    if (this.getGroupsLength === 0) {
      await this.$store.dispatch('fetchGroupsfromBD')
    }
    if (this.getGroupsLength !== 0 && typeof this.getAllSettings.length === 'undefined') {
      await this.$store.dispatch('fetchSettingsfromBD')
    }
    M.updateTextFields()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Settings{
  position: relative;
  padding: 20px 30px;
}
.row{
    height: 100%;
    display: flex;
    flex-direction: row;
}

.delay{
  flex: 0 1 45%;
  padding: 0 10px;
  margin: 5px;
  border: solid 1px #777;
}
.period{
  flex: 0 1 55%;
  padding: 0 10px;
  margin: 5px;
  border: solid 1px #777;
}

.postsForGroup{
  flex: 0 1 50%;
  padding: 0 10px;
  margin: 5px;
  border: solid 1px #666;
}

h5{
  color: #ccc;
}

[type="radio"]:not(:checked) + span:before, [type="radio"]:not(:checked) + span:after{
  border: 2px solid #777 !important;
}

[type="radio"]:checked + span:after, [type="radio"].with-gap:checked + span:after {
  background-color: #039be5 !important;
  border: 2px solid #039be5 !important;
}
p{
  color: #ccc;
}

textarea{
  color: #fff;
  margin-bottom: 0 !important;
}
textarea:focus{
  border-bottom: 1px solid #039be5 !important;
}

label.active{
  color: #039be5 !important;
}
p.minusWords{
  font-size: 10px;
  margin: 0;
  color: #777;
}

</style>
