<template>
  <div id="user">
    <div class="head">
      <div class="logo">
        <span class="iconfont icon-icon"></span>
      </div>
      <div class="login" >
        <span @click="login" v-show="status">登录&nbsp;/</span>
        <span @click="register" v-show="status">&nbsp;注册</span>
        <span v-show="!status">{{user}}</span>
      </div>
    </div>
    <div class="order">
      <div class="filmorder">
        <p class="iconfont icon-dingdan"></p>
        <p class="cont">电影订单</p>
      </div>
      <div class="goodsorder">
        <p class="iconfont icon-dingdan1"></p>
        <p  class="cont">商品订单</p>
      </div>
    </div>
    <ul>
      <li>
        <div>
          <span  class="iconfont icon-quan"></span>
          <span>卖座券</span>
        </div>
        <span class="item">&gt;</span>
      </li>
      <li>
         <div>
          <span  class="iconfont icon-hongbao"></span>
          <span>组合红包</span>
        </div>
        <span class="item">&gt;</span>
      </li>
      <li>
        <div>
          <span  class="iconfont icon-yue"></span>
          <span>余额</span>
        </div>
        <span class="item">&gt;</span>
      </li>
      <li>
        <div>
          <span  class="iconfont icon-shezhi"></span>
          <span>设置</span>
        </div>
        <span class="item">&gt;</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status:true,
      user:"",
    };
  },
  created() {
    if(sessionStorage.getItem("username")){
      this.status=false;
      this.user="欢迎 "+sessionStorage.getItem("username")+" 来到卖座电影!";
    }
  },
  methods:{
    login(){
      if(!sessionStorage.getItem("username")){
        this.$router.push({
          name:"login",
          query:{k:Date.now()}
        })
      }
    },
    register(){
      if(!sessionStorage.getItem("username")){
        this.$router.push({
          name:"register",
          query:{k:Date.now()}
        })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#user{
  background-color:rgb(238, 235, 235);
.head {
  height: 4rem;
  background-color: rgb(246, 111, 1);
  .logo {
    width: 0.8rem;
    margin: 0 auto;
    padding-top: 1rem;
    .iconfont.icon-icon {
      font: 0.8rem/1 "";
    }
  }
  .login {
    text-align: center;
    margin-top: 0.35rem;
    color:#fff;
  }
}
.order{
  display:flex;
  justify-content: space-between;
  padding:.4rem 1.5rem;
  text-align: center;
  background-color:#fff;
  .iconfont.icon-dingdan{
    margin: 0;
    font:.6rem/1 "";
    color:#f66600;
  }
  .iconfont.icon-dingdan1{
    margin: 0;
    font:.6rem/1 "";
    color:#5f5;
  }
  .cont{
    font-size:.3rem
  }
}
li{
  padding:0 .3rem;
  height:1rem;
  background-color: #fff;
  display: flex;
  justify-content:space-between;
  span{
    font-size:.28rem;
  }
  span.iconfont{
    font-size:.3rem;
    margin-right:.1rem;
  }
  .icon-quan{
    color:#f66;
  }
  .icon-hongbao{
    color:#f00;
  }
  .icon-yue{
    color:#f66600;
  }
  .item{
    color:#ccc;
  }
}
}
</style>