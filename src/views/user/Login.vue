<template>
  <div>
    <div class="iconfont icon-fanhui" @click="back"></div>
    <div class="logo">
      <img src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png" />
    </div>
    <div class="cont">
      <div class="name">
        <input type="text" placeholder="用户名" v-model="name" />
      </div>
      <div class="pass">
        <input type="text" placeholder="密码" v-model="pass" />
      </div>
    </div>
    <div class="register" @click="login">登录</div>
    <div class="tologin" @click="toregister">还没账号？去注册</div>
    <div class="successTip" v-show="successStatus">{{successTips}}</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      pass: "",
      successTips:"",
      successStatus:false,
    };
  },
  methods: {
    back() {
      this.$router.push({
        //   path:"/movie/hot",
        name: "hot",
        query: { k: Date.now() }
      });
    },
    toregister() {
      this.$router.push({
        name: "register",
        query: { k: Date.now() }
      });
    },
    login(){
        axios.get("/register/user",{
            params:{
                type:"login",
                user:this.name,
                pass:this.pass
            }
        }).then(res=>{
            if(this.name!==""&&this.pass!==""){
                if(res.data.code==1){
                    sessionStorage.setItem("username",res.data.msg.user)
                    this.successStatus=true;
                    this.successTips="登录成功!正在返回..."
                    setTimeout(()=>{
                        this.$router.push({
                            name:"user",
                            query:{k:Date.now()}
                        })
                    },2000)
                }else{
                    this.successStatus=true;
                    this.successTips=res.data.msg;
                }
            }else{
                this.successStatus=false;
            }
        })
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-fanhui {
  color: #f66600;
  position: fixed;
  left: 0.4rem;
  top: 0.4rem;
  font-size: 0.4rem;
}
.logo {
  margin: 1.6rem auto 0.8rem;
  text-align: center;
  img {
    width: 1.2rem;
    height: 1.2rem;
  }
}
.cont {
  text-align: center;
  input {
    border: 0;
    margin: 0 0.5rem;
    line-height: 0.4rem;
    padding: 0.4rem 0;
    border-bottom: 0.02rem solid #ccc;
  }
}
.register {
  text-align: center;
  line-height: 0.5rem;
  margin: 0.4rem auto 0.2rem;
  width: 2rem;
  background-color: #f66600;
  color: #fff;
  padding: 0.15rem;
  border-radius: 0.15rem;
}
.tologin {
  text-align: center;
  color: #998;
}
.successTip{
  text-align:center;
  padding:.4rem;
  color:#f66600;
}
</style>