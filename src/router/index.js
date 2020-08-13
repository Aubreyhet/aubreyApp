/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'

//导入组件
import Login from '../components/Login.vue'

import Home from '../components/Home.vue'

import Welcome from '../components/Welcome.vue'

import User from '../components/user/users.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [{
          path: '/welcome',
          component: Welcome
        },
        {
          path: '/User',
          component: User
        }
      ]
    }
  ]
})


//挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next();
//   const tonkenStr = window.sessionStorage.getItem('token')
//   if (!tonkenStr) return next('/login')
//   next()
// })



export default router
