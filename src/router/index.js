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
import Sear from '@/views/cinema/Sear'
import CinemaFilm from "@/views/cinema/CinemaFilm"
import CinemaReception from "@/views/cinema/CinemaReception"
import CinemaBuy from "@/views/cinema/CinemaBuy"
import Login from "@/views/user/Login"
import Register from "@/views/user/Register"
Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      'status': true
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      'status': true
    }
  },
  {
    path: "/hotdetail/:id",
    name: "hotdetail",
    component: HotDetail,
    meta: {
      'status': true
    }
  },
  {
    path: "/comedetail/:id",
    name: "comedetail",
    component: ComeDetail,
    meta: {
      'status': true
    }
  },
  {
    path: "/movie",
    name: "movie",
    component: Movie,
    children: [
      {
        path: "hot",
        component: Hot,
        name: "hot"
      },
      {
        path: "comming",
        component: Come
      },
      {
        path: "",
        redirect: 'hot'
      },
      {
        path: "*",
        redirect: 'hot'
      }
    ]

  },
  {
    path: "/cinema",
    component: Cinema,
  },
  {
    path: "/cinemafilm/:cinemaId",
    component: CinemaFilm,
    name: 'cinemafilm',
    meta: {
      'status': true
    }
  },
  {
    path: "/cinemasearch",
    component: Sear,
    name: "search",
    meta: {
      'status': true
    }
  },
  {
    path: "/cinemareception/:cinemaId",
    component: CinemaReception,
    name: 'cinemareception',
    meta: {
      'status': true
    }
  },
  {
    path: "/cinemabuy/:filmId",
    component: CinemaBuy,
    name: "cinemabuy",
    meta: {
      'status': true
    }
  },
  {
    path: "/info",
    component: Info,
    meta: {
      'status': true
    }
  },
  {
    path: "/user",
    name: "user",
    component: User
  },
  {
    path: "/",
    redirect: "/movie"
  },
  {
    path: "/city",
    component: City,
    meta: {
      'status': true
    }
  },
  {
    path: "*",
    component: Not,
    meta: {
      'status': true
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
