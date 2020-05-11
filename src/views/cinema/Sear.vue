<template>
  <div>
    <div class="search">
      <i class="iconfont icon-sousuo"></i>
      <input type="text" placeholder="输入影城名字" @input="search" ref="searchNode" />
      <i class="iconfont icon-qa-close" v-if="clearStatus" @click="empty"></i>
      <span class="cancelBtn" @click="back">取消</span>
    </div>
    <div class="minDis" v-show="listStatus">
      <p>离你最近</p>
      <ul class="disList">
        <li v-for="item in latelyList" :key="item.cinemaId">{{item.name}}</li>
      </ul>
    </div>
    <ul class="searchList" v-show="searchStatus">
      <li v-for="val in list" :key="val.cinemaId" class="searchCont">
        <div>
          <span>{{val.name}}</span>
          <span>{{val.lowPrice}}</span>
        </div>
        <div>{{val.address}}</div>
      </li>
    </ul>
    <div v-show="tips" class="tips">
      <img
        src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2871000271,3880267279&fm=26&gp=0.jpg"
      />
      <p>没有找到匹配的影院</p>
      <p>提示：仅支持搜索“影院”，建议您检查输入的影院名称是否有误？</p>
    </div>
  </div>
</template>

<script>
import { getMinDisCinema } from "@/api";
import { getSearchCinema } from "@/api";
export default {
  data() {
    return {
      clearStatus: false,
      listStatus: true,
      searchStatus: false,
      tips: false,
      latelyList: [], // 离我最近的电影院列表
      searchList: [], // 请求的电影院列表
      list: [] //搜索列表
    };
  },
  computed: {},
  methods: {
    search() {
      // 如果输入不为空
      if (this.$refs.searchNode.value !== "") {
        // 先把list清空
        this.list.splice(0);
        this.searchStatus = true;
        this.listStatus = false;
        this.tips = false;
        this.searchList.forEach(item => {
          if (item.name.includes(this.$refs.searchNode.value)) {
            this.list.push({
              cinemaId: item.cinemaId,
              name: item.name,
              lowprice: item.lowprice,
              address: item.address
            });
          }
        });
        // 如果没有搜索到
        if (this.list.length == 0) {
          this.tips = true;
          this.searchStatus = false;
          this.listStatus = false;
        }
      }
      // 输入为空
      else {
        this.searchStatus = false;
        this.listStatus = true;
        this.tips = false;
      }
    },
    empty() {
      this.$refs.searchNode.value = "";
      this.clearStatus = false;
    },
    back() {
      history.go(-1);
    }
  },
  created() {
    getMinDisCinema(localStorage.getItem("cityId")).then(res => {
      this.latelyList = res.data.data.cinemas;
    });
    getSearchCinema(localStorage.getItem("cityId")).then(res => {
      this.searchList = res.data.data.cinemas;
    });
  }
};
</script>

<style lang="scss" scoped>
.search {
  padding: 0.2rem 0.6rem;
  background-color: rgb(235, 230, 230);
  display: flex;
  justify-content: center;
  input {
    width: calc(100% - 0.8rem);
    line-height: 0.6rem;
    border: 0;
  }
  i {
    text-align: center;
    width: 0.8rem;
    line-height: 0.6rem;
    background-color: #fff;
  }
  .cancelBtn {
    width: 1rem;
    height: 0.6rem;
    line-height: 0.6rem;
    padding: 0.04rem;
    margin-left: 0.06rem;
  }
}
.minDis {
  padding: 0.2rem 0 0 0.4rem;
  p {
    color: #ccc;
  }
  .disList {
    line-height: 0.4rem;
    display: flex;
    flex-wrap: wrap;
    li {
      padding: 0.1rem;
      background-color: rgb(235, 230, 230);
      margin: 0.2rem 0.3rem;
    }
  }
}
.searchCont {
  padding: 0.4rem;
  margin: 0.3rem 0;
}
.tips {
  margin-top: 0.6rem;
  text-align: center;
  img {
    width: 3rem;
    height: 3rem;
  }
  p {
    width: 50%;
    padding: 0;
    margin: auto;
    line-height:.4rem;
    color:rgb(200, 200, 200)
  }
}
</style>