<template>
  <div>
    <div class="back" @click="back">&lt;&lt;</div>
    <ul>
      <li v-for="item in list" :key="item.cinemaId">
        <div class="name">{{item.name}}</div>
        <div class="address">
          <span class="icon-dingwei iconfont">{{item.address}}</span>
          <span>&gt;</span>
        </div>
        <div class="tel">
          <span class="iconfont icon-dianhua">{{item.phone}}</span>
          <span>&gt;</span>
        </div>
        <ul>
          <li v-for="(val,index) in item.services" :key="index">
            <div class="listcont">
              <div class="serviceName">{{val.name}}</div>
              <div class="serviceDes">{{val.description}}</div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { getCinemaReception } from "@/api";
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    getCinemaReception(this.$route.params.cinemaId).then(res => {
      this.list.push(res.data.data.cinema);
    });
  },
  methods: {
    back() {
      history.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.back {
  width: 0.5rem;
  line-height: 0.4rem;
  border-radius: 0.15rem;
  background-color: rgba(0, 0, 0, 0.5);
  margin: 0.2rem 0 0 0.15rem;
  color: #fff;
}
.name{
    text-align: center;
    height:1rem;
    border-bottom:.02rem solid #ccc;
    margin:.2rem;
}
.address,.tel{
    display:flex;
    justify-content:space-between;
    padding:.4rem .2rem;
    margin:0 .2rem;
    border-bottom:.02rem solid #ccc;
}
.listcont{
    display: flex;
    justify-content:space-between;
    margin:.35rem .2rem;
    .serviceDes{
        width:4.9rem;
        font:.22rem/.34rem "";
    }
    .serviceName{
        flex:1;
        font:.2rem/.3rem "";
        padding:.06rem;
        color:#f66000;
    }
}
.iconfont:before{
    margin-right:.08rem;
}

</style>