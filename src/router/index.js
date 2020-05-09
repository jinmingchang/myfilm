import Vue from 'vue'
import VueRouter from 'vue-router'
import Movie from '@/views/Movie'
import Cinema from '@/views/Cinema'
import Info from '@/views/Info'
import User from '@/views/User'
import Not from '@/views/Not'
import Hot from '@/views/movies/Hot'
import Come from '@/views/movies/Come'
import HotDetail from '@/views/Detail/HotDetail'
import ComeDetail from '@/views/Detail/ComeDetail'
import City from '@/views/City'
Vue.use(VueRouter)

  const routes = [
    {
      path:"/hotdetail/:id",
      name:"hotdetail",
      component:HotDetail,
      meta:{
        'status':true    
      }
    },
    {
      path:"/comedetail/:id",
      name:"comedetail",
      component:ComeDetail,
      meta:{
        'status':true    
      }
    },
    {
      path:"/movie",
      component:Movie,
      children:[
        {
          path:"hot",
          component:Hot
        },
        {
          path:"comming",
          component:Come
        },
        {
          path:"",
          redirect:'hot'
        },
        {
          path:"*",
          redirect:'hot'
        }
      ]
      
    },
    {
      path:"/cinema",
      component:Cinema 
    },
    {
      path:"/info",
      component:Info,
      meta:{
        'status':true    
      }
    },
    {
      path:"/user",
      component:User
    },
    {
      path:"/",
      redirect:"/movie"
    },
    {
      path:"/city",
      component:City,
      meta:{
        'status':true    
      }
    },
    {
      path:"*",
      component:Not,
      meta:{
        'status':true    
      }
    }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
