<template>
      <div class="swiper-container">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination pages"></div>
    </div>
</template>

<script>
import Swiper from 'swiper';

export default {
    mounted() {

        new Swiper ('.swiper-container', {
            loop: true, // 循环模式选项
            // 如果需要分页器
            autoplay: {
              delay: 3000,
              disableOnInteraction: false  //用户交互后还能自动轮播
            }, 
            pagination: {   
                el: '.swiper-pagination',
            },
        })
    },
}
</script>

<style  lang='scss'>
    img{
        width:100%;
        height:3.8rem;
    }
    .pages{
        text-align:right;
    }
</style>