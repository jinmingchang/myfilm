<template>
  <div>
    <div class="top">
      <span @click="back">&lt;</span>
      <span v-for="item in filmMsg" :key="item.filmId">{{item.name}}</span>
      <span class="iconfont icon-sousuo" @click="toCinemaSearch"></span>
    </div>
    <div>
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" ref="option1" />
        <van-dropdown-item v-model="value2" :options="option2" ref="option2" />
      </van-dropdown-menu>
    </div>
    <ul>
        <li v-for="val in cinemaMsg" :key="val.bannerId" class="cont">
            <a :href="JSON.parse(val.actionData).url">
                <div class="masterTitle">
                    <span>{{val.masterTitle}}</span>
                    <span class="ticket">影院券</span>
                </div>
                <div class="name">{{val.name}}</div>
            </a>
        </li>
    </ul>
  </div>
</template>

<script>
import { getDetail } from "@/api";
import {getFilmCinema} from "@/api";
// import {getOtherFilmCinema} from "@/api"
export default {
  data() {
    return {
        filmMsg:[],
        cinemaMsg:[],
        value1: 0,
        value2: "a",
        option1: [{ text: "全城", value: 0 }],
        option2: [
            { text: "最近去过", value: "a" },
            { text: "离我最近", value: "b" }
        ]
    };
  },
  created() {
    getDetail(this.$route.params.filmId).then(res => {
      this.filmMsg.push(res.data.data.film);
    });
    getFilmCinema(localStorage.getItem("cityId")).then(res=>{
        this.cinemaMsg=res.data.data;
    });
    // getOtherFilmCinema().then(res=>{
    //     console.log(res)
    // })
  },
  methods:{
      back(){
          history.go(-1);
      },
      toCinemaSearch(){
          this.$router.push({
              name:"search",
              query:{k:Date.now()}
          })
      }
  }
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  line-height: 0.6rem;
  padding: 0.2rem .4rem;
}
.cont{
    padding:.3rem;
    .masterTitle{
        font:.3rem/1.3 "";
        .ticket{
            margin-left:.1rem;
            border:.02rem solid #f66600;
            color:#f66600;
            font:.26rem/1.3 "";
        }
    }
    .name{
        margin-top:.1rem;
        font:.26rem/1.3 "";
    }
}
</style>