<template>
  <div id="app">
    <router-view></router-view>
    <footer>
      <ul class="nav" v-show="visibel">
        <li><router-link to="/movie">电影</router-link></li>
        <li><router-link to="/cinema">影院</router-link></li>
        <li><router-link to="/info">资讯</router-link></li>
        <li><router-link to="/user">我的</router-link></li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  data(){
    return{
      'visibel':true
    }
  },
  watch:{
    $route:{
      handler(r){
        this.visibel = !r.meta.status;  //status为true,footer不显示，status为false(undefined)显示footer
      },
      immediate:true
    }
  },
  components:{

  }
}
</script>>

<style lang="scss">
  @import '~@/assets/css/reset.css';

  footer{
    position:fixed;
    bottom:0;
    left:0;
    right:0;
    width:100%;
    .nav{
      line-height: 0.6rem;;
      display: flex;text-align: center;
      background-color:#ccc;
      li{
        flex:1;
        a{
          line-height: 0.8rem;
        }
      }
    }
  }
  .router-link-active {
    color:#f66;
  }
</style>
