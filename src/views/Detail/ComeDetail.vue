<template>
  <div id="come">
    <div class="back" @click="back">&lt;&lt;</div>
    <ul>
      <li v-for="item in list" :key="item.filmId">
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <div class="top" v-scrolling="'fixed'">
            <span class="return" @click='back'>&lt;</span>
            <span>{{item.name}}</span>
          </div>
        </transition>
        <div>
          <img :src="item.poster" class="play" />
        </div>
        <div class="intro">
          <div>
            <span class="moviename">{{item.name}}</span>
            <span class="kind">{{item.item.name}}</span>
          </div>
          <div>
            <span class="category">{{item.category}}</span>
          </div>
          <div>
            <!-- 自定义过滤器：指定格式 -->
            <span>{{item.premiereAt | formatDate}}</span>
          </div>
          <div>
            <span>{{item.nation}} | {{item.runtime}}分钟</span>
          </div>
          <div>
            <p class="des">{{item.synopsis}}</p>
          </div>
        </div>
        <div class="actorPart">
          <h3>演职人员</h3>
          <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide"  v-for="(val,index) in item.actors" :key="index">
                  <img :src="val.avatarAddress" class="actorPhoto" />
                  <div class="actor">{{val.name}}</div>
                  <div class="role">{{val.role}}</div>
                </div>
            </div>
          </div>
          <!-- <ul class="actorList">
            <li v-for="(val,index) in item.actors" :key="index">
              <img :src="val.avatarAddress" class="actorPhoto" />
              <div class="actor">{{val.name}}</div>
              <div class="role">{{val.role}}</div>
            </li>
          </ul> -->
        </div>
        <div>
          <h5 class="footer">
            <span class="stills">剧照</span>
            <span class="allphoto">全部({{item.photos.length}})</span>
          </h5>
          <ul class="photos">
            <li v-for="(v,index) in item.photos" :key="index">
              <img :src="v" class="footerimg" style="width:100"/>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getDetail } from "@/api";
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css'
export default {
  data() {
    return {
      id: 0,
      list: [],
      status:false
    };
  },
  // 根据id请求电影的相关数据
  created() {
    getDetail(this.id).then(res => {
      this.list.push(res.data.data.film);
      this.$nextTick(()=>{
        new Swiper(".swiper-container",{
          slidesPerView:2
        })
      })
    });
    
  },
  // 监听Come路由传过来的id
  watch: {
    $route: {
      handler(r) {
        this.id = r.params.id;
      },
      immediate: true
    }
  },
  methods: {
    back() {
      history.go(-2);
    },
    // 控制顶部的显示和隐藏
    // topShow(){
    //     if(document.documentElement.scrollTop >= this.$refs.top[0].offsetHeight){
    //         this.status=true;
    //     }else{
    //         this.status=false;
    //     }
    // }
  },
  mounted(){
    //   监听窗口滚动
      // window.onscroll=this.topShow;
  },
  beforeDestroy(){
      // window.onscroll= null;
  },
};
</script>

<style lang="scss" scoped>
#come {
  background-color: #ccc;
  .top {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height:1rem;
     line-height: 1rem;
    background-color: #fff;
    text-align: center;
    .return {
      position: absolute;
      left: 0.2rem;
      width: 0.5rem;
      line-height: 1rem;
    }
  }
  .back {
    position: fixed;
    top: 0.2rem;
    left: 0.2rem;
    width: 0.5rem;
    line-height: 0.5rem;
    border-radius: 0.5rem;
    padding: 0.06rem;
    color: #000;
    text-align: center;
    background: rgba($color: #991, $alpha: 0.5);
  }
  .play {
    height: 5rem;
  }
  .intro {
    background-color: #fff;
    padding: 0.24rem 0.3rem 0.3rem 0.3rem;
    .moviename {
      line-height: 0.36rem;
      margin-right: 0.14rem;
    }
    .kind {
      font: 0.18rem/0.28rem "";
      background-color: #666;
      display: inline-block;
    }
    .category {
      font-size: 0.26rem;
      margin-top: 0.1rem;
    }
  }
  .actorPart {
    background-color: #fff;
    margin: 0.08rem 0;
    h3 {
      line-height: 0.8rem;
      padding-left: 0.1rem;
    }
    .actorList {
      display: flex;
      li {
        width: 1.7rem;
        margin: 0 0.06rem;
        .actorPhoto {
          height: 1.7rem;
        }
        .actor {
          font: 0.24rem/0.36rem "";
          margin-top: 0.2rem;
        }
        .role {
          font-size: 0.2rem;
        }
      }
    }
  }

  .footer {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0 0.12rem;
    line-height: 0.6rem;
  }
  .photos {
    display: flex;
    overflow: hidden;
    .footerimg {
      width: 3rem;
      height: 2.1rem;
    }
  }
}
</style>