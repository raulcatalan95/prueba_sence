import Vue from 'vue'
import VueRouter from 'vue-router'
import Inicio from '../views/Inicio.vue'
import Home from '../views/Home.vue'
import Ordenes from '../views/Ordenes.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'


Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'inicio',
      component: Inicio,
      redirect:{name:"home"},
      children:[
        {
          path: 'home',
          name: 'home',
          component: Home
        },
        {
          path: 'ordenes',
          name: 'ordenes',
          component: Ordenes,
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    },


    
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
