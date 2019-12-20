import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import 'materialize-css'
import 'materialize-css/dist/css/materialize.css'

import firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyAL5kT2HV1yc94JZ1FBbFepdBsr89iF3NA',
  authDomain: 'vosk-a5448.firebaseapp.com',
  databaseURL: 'https://vosk-a5448.firebaseio.com',
  projectId: 'vosk-a5448',
  storageBucket: 'vosk-a5448.appspot.com',
  messagingSenderId: '872767132410',
  appId: '1:872767132410:web:af8af31ca8277af52eef43',
  measurementId: 'G-LD600YR3KL'
}

const firebaseApp = firebase.initializeApp(config)
const db = firebaseApp.firestore()

// db.settings({
//   timestampsInSnapshots: true
// })

Vue.$db = db

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
