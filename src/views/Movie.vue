<template>
<div>
    <slide ref="myswiper">
        <div class="swiper-slide">
            <img src="https://static.maizuo.com/v5/upload/189bcf606b4bf49ad5de201a2ea5024d.jpg?x-oss-process=image/quality,Q_70">
        </div>
        <div class="swiper-slide">
            <img src="@/assets/img/a.jpg">
        </div>
        <div class="swiper-slide">
            <img src="@/assets/img/f.jpg">
        </div>
    </slide>
    <nav-movie :class="{'active':status}"></nav-movie>
    <div class="list">
        <router-view></router-view>
    </div>
    <div class="gps" @click="toCity">
        <span class="gpsCity">{{position}}</span>
        <span class="gpsimg">&lt;</span>
    </div>
</div>
</template>

<script>
import Slide from './movies/Swiper'
import NavMovie from '@/views/movies/NavMovie'
export default {
    data(){
        return{
            status:false
        }
    },
    components:{
        Slide,
        NavMovie,
    },
    computed:{
        position(){
            return localStorage.getItem("cityName")
        }
    },
    mounted(){
        // 监听窗口滚动
        window.onscroll=this.moviescroll;
    },
    beforeDestroy(){
        // 解绑事件
        window.onscroll = null;
    },
    methods:{
        moviescroll(){
            // 如果窗口滚动的高度大于轮播图的高度，就让导航固定
            if(document.documentElement.scrollTop >= this.$refs.myswiper.$el.offsetHeight){
                this.status= true;
            }else{
                this.status=false;
            }
        },
        // 点击路由到定位页
        toCity(){
            this.$router.push('/city')
        }
    }
}
</script>

<style lang="scss">
    .active{
        position: fixed;
        left:0;
        top:0;
        right:0;
        background-color:#fff;
    }
    .gps{
        position:fixed;
        background-color: rgba($color: #000000, $alpha: .5);
        border-radius:.16rem;
        padding:.06rem;
        z-index:2;
        left:.2rem;
        top:.4rem;
        color:#fff;
        .gpsimg{
            width:.12rem;
            height:.1rem;
            margin-left:.1rem;
            transform: rotateZ(90deg);
        }
    }
</style>