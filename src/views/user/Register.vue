<template>
  <div>
    <div class="iconfont icon-fanhui" @click="back"></div>
    <div class="logo">
      <img src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png" />
    </div>
    <div class="cont" ref="nodeList">
      <div class="name">
        <input type="text" placeholder="用户名" v-model="name" @input="verification(name,1)"/>
      </div>
      <div class="pass">
        <input type="text" placeholder="密码" v-model="pass" @input="verification(pass,2)"/>
      </div>
      <div class="tel">
        <input type="text" placeholder="手机" v-model="tel" @input="verification(tel,3)"/>
      </div>
      <div class="email">
        <input type="text" placeholder="邮箱" v-model="email" @input="verification(email,4)"/>
        <div class="tips" v-show="tipStatus">{{description}}</div>
      </div>
    </div>
    <div class="register" @click="postMsg">立即注册</div>
    <div class="tologin" @click="tologin">已有账号?去登录</div>
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
      tel: "",
      email: "",
      tipStatus:false,
      description:"",
      successStatus:false,
      successTips:''
    };
  },
  methods: {
    back() {
      this.$router.push({
        // path:"/movie/hot",
        name:"hot",
        query:{k:Date.now()}
      })
    },
    postMsg() {
      axios.get("/register/user", {
        params:{
          type: "register",
          user: this.name,
          pass: this.pass,
          tel: this.tel,
          email: this.email
        }
        }).then(res => {
          if(res.data.code==1){
            this.successStatus=true;
            this.successTips=`${res.data.msg},正在跳转登录页...`;
            setTimeout(()=>{
              this.tologin();
            },2000)
          }else{
            this.successStatus=true;
            this.successTips=`${res.data.msg}`;
          }
        });
    },
    tologin(){
      this.$router.push({
        name:"login",
        query:{k:Date.now()}
      })
    },
    verification(content,type){
      switch(type){
        case 1:{
          if(!/^[a-zA-Z]{3,10}$/.test(content)){
            this.tipStatus=true;
            this.description="请输入3到10位字母组合"
          }else{
            this.tipStatus=false;
          }
        }
        break;
        case 2:{
          if(!/^[0-9]{6}$/.test(content)){
             this.tipStatus=true;
              this.description="请输入6位数字组合"
          }else{
            this.tipStatus=false;
          }
        }
        break;
        case 3:{
          if(!/^1[3-9]\d{9}$/.test(content)){
             this.tipStatus=true;
              this.description="请输入11位有效的手机号"
          }else{
            this.tipStatus=false;
          }
        }
        break;
        case 4:{
          if(!/^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/.test(content)){
             this.tipStatus=true;
              this.description="邮箱输入有误，请重新输入"
          }else{
            this.tipStatus=false;
          }
        }
      }
    },
  },
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
.tips{
  color:#998;
  font:.3rem/1 "";
  padding:.1rem;
}
.successTip{
  text-align:center;
  padding:.4rem;
  color:#f66600;
}
</style>