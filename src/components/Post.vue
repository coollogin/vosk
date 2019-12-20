<template>
  <div class="post">

    <div class="postDate">{{timeConverter}}</div>
    <div class="favorites" :class="[post.favorite ? 'favorite' : false ]" @click="SetFavorite" ><i class="tiny material-icons">grade</i></div>

      <div href="#">
        <b><a :href="post.link" @click.prevent="openLink(post.link)">{{post.groupName}}</a></b>
      <br>
        <div class="body1">
          <p>{{post.text}}</p>
        </div>

        <!-- :v-if="post.attachments !== 'undefined'" -->
        <div class="attachments" v-if="post.attachments">
            <template v-for="(element, index) in attachmentsPhoto">
                <a :key="index" :href="element.photo.sizes[2].url" @click.prevent="openLink(post.link)">
                  <img :src="element.photo.sizes[1].url" alt="images" />
                </a>
           </template>
          <!-- <template v-for="(element, index) in attachmentsPhoto">
               <a :key="index" >
                 {{element.type}}
               </a>
          </template> -->
         <!-- <template v-for="el in attachmentsPhoto">
           {{el.type}}
             <a :href="element.photo.sizes[2].url" >
               <img :src="el.photo.sizes[1].url" alt="images" />
             </a>
        </template>> -->
        </div>
      </div>
  </div>
</template>

<script>
// import { ipcRenderer } from 'electron'
import { mapActions } from 'vuex'
const shell = window.require('electron').shell // ДЛя открытия внешних ссылок
export default {
  name: 'Post',
  props: {
    post: {
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
      'id': this.post.id,
      'title': this.post.title
    }
  },
  methods: {
    ...mapActions(
      [ 'addToFavorite' ]
    ),
    openLink (ilink) {
      shell.openExternal(ilink)
    },
    SetFavorite () {
      // alert(this.post._id.id)
      // console.log(this.post._id)
      // ipcRenderer.send('setFavorite', this.post._id, !this.post.favorite)

      // this.post.favorite = !this.post.favorite
      this.addToFavorite(this.post)
      // alert(this.post.post_id)
      // alert(this.post.text)
    }
  },
  computed: {
    timeConverter () {
      // console.log(this.post.data().date)
      var a = new Date(this.post.date * 1000) // .toMillis()
      var months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
      var year = a.getFullYear()
      var month = months[a.getMonth()]
      var date = a.getDate()
      var hour = a.getHours()
      var min = a.getMinutes()
      var sec = a.getSeconds()
      var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
      return time
    },
    attachmentsPhoto () {
      if (this.post.attachments.length > 0) {
        return this.post.attachments.filter(function (el) {
          return typeof el.photo !== 'undefined'
        })
        // return this.post.attachments.filter(file => file.type === 'photo')
      }
      return {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:900i');

.card{
  opacity: 0.7;
  padding: 6px 20px;
}

.post{
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 0 0 #d7d8db, 0 0 0 1px #e3e4e8;
  border-radius: 4px;
  margin: 15px 0 0;
  padding: 8px 20px 5px;
  opacity: 1;
}
.postDate{
  display: block;
  position: absolute;
  right: -1px;
  top: -1px;
  padding: 2px 6px;
  border-radius: 0 4px 0 6px;
  background-color: #ccc;
  box-shadow: 5px 5px 10px #333;
  opacity: 1;
}
.body{
  font-family: Roboto,Open Sans,Helvetica Neue,Noto Sans Armenian,Noto Sans Bengali,Noto Sans Cherokee,Noto Sans Devanagari,Noto Sans Ethiopic,Noto Sans Georgian,Noto Sans Hebrew,Noto Sans Kannada,Noto Sans Khmer,Noto Sans Lao,Noto Sans Osmanya,Noto Sans Tamil,Noto Sans Telugu,Noto Sans Thai,sans-serif;
  line-height: 1.462;
  font-size: 13px;
}

.attachments{
  display: flex;
  margin-top: 18px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items:flex-start;

  a{
    flex: 0 0 auto;
    margin: 4px 4px 0;
  }

  .attachments img{
    height: 100%;
    width: 100%;
  }

}

.favorites{
  display: block;
  position: absolute;
  top: 40px;
  right: -1px;
  width: 25px;
  height: 35px;
  background-color: #82d5ff;
  border-radius: 20% 0 0 20%;
  box-shadow: 5px 5px 10px #333;
  padding: 8px 6px;
  // font-size: 26px;
  color: #fff;
  cursor: pointer;
  opacity: 0.8;
}
.favorites.favorite{
  color: #FFCC00;
}
</style>
