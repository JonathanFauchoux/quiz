import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "home-page" */ './views/HomeView.vue')
    },
    // Your routes
    {
      path: '*',
      name: '404',
      component: () => import(/* webpackChunkName: "no-page" */ './views/NoPageView.vue')
    }
  ]
})
