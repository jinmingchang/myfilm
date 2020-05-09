<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
      <ul>
        <li v-for="item in list" :key="item.positionId">
          <img :src="'https://www.lgstatic.com/'+item.companyLogo">
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      list: [],
      loading: false,   //不是正在加载，可以请求数据
      finished: false,    // 是否加载完成
      pageNo:1
    }
  },
  methods: {
    onLoad(){
      this.getData();
    },
    getData(){
      axios.get("/lg/listmore.json",{
        params:{
          pageNo:this.pageNo,
          pageSize:10
        }
      }).then(res=>{
        this.list = this.list.concat(res.data.content.data.page.result);    //合并数据，不会覆盖
        this.pageNo++;  // 让每次拿到的数据都是新的
        this.loading=false;   // 发一次请求一次

        // 停止加载的判断
        if(this.list.length>100){
          this.finished = true;
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
  img{
    width:1rem;
    height:1rem;
  }
</style>