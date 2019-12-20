import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/store'
import Home from '../views/Home.vue'
import Posts from '../views/Posts.vue'
import Favorites from '../views/Favorites.vue'
import Groups from '../views/Groups.vue'
import Stats from '../views/Stats.vue'
import Settings from '../views/Settings.vue'
import Login from '../views/Login.vue'
// import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/posts',
    name: 'posts',
    component: Posts
  },
  {
    path: '/groups',
    name: 'groups',
    component: Groups
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorites
  },
  {
    path: '/stats',
    name: 'stats',
    component: Stats
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (store.getters.getAuthorizationStatus || to.path === '/login') {
    // if (!store.getters.getProcessing) {
    store.commit('updateSearchKey', '') // .then(() => next())
    next()
    // }
  } else {
    next('/login')
  }
})

export default router
