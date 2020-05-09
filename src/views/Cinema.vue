<template>
  <div>
    <header>
      <div class="position">
        <router-link to="/city">{{position}}</router-link>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAMAAAAIAYw9AAAAOVBMVEVHcEwZGhsZGxsZGhskJCQaGhwbGxsZHR0ZGhsZGhsZGhsZGhsZHBwaGhsaGhwZGxsaGh0bGxsZGhsAwt9XAAAAEnRSTlMA5Z7pB2scPfrK6NJskn6fcnH7htMrAAAAVElEQVQI11XNOQKAIBAEwQEXl0NQ+/+PNfDucIIabaGbnqyHXQHKfC9zgaABVD8Xr8CQlgw5SVLKkBdJ8gmIZhGY/BUoha9qKwDEz/fJJP3y1i5GB2jVA/F2X5USAAAAAElFTkSuQmCC"
        />
      </div>
      <div>影院</div>
      <div>搜索</div>
    </header>
    <div class="cinemaList">
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" ref="option1" />
        <van-dropdown-item v-model="value2" :options="option2" />
        <van-dropdown-item v-model="value2" :options="option3" />
      </van-dropdown-menu>
    </div>
    <ul class="list">
      <li v-for="item in sameList" :key="item.cinemaId" class="cont">
        <div>
          <div class="name">{{item.name}}</div>
          <div class="address">{{item.address}}</div>
        </div>
        <div>
          <div class="price">￥{{item.lowPrice}}起</div>
          <!-- <div></div> -->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getCinema } from "@/api";
export default {
  data() {
    return {
      list: [], //  存放请求的数据
      sameList: [], //  用于切换地区存放数据
      position: "", //  存放定位地点
      cinemaObj: {}, //  存放分区信息：{xx区:{xxx:{},xxx:{}}}
      sortCinema: [], //  存放分区名
      value1: 0,
      value2: "a",
      option1: [
        { text: "全城", value: 0 }
        // { text: "新款商品", value: 1 },
        // { text: "活动商品", value: 2 }
      ],
      option2: [
        { text: "APP订票", value: "a" },
        { text: "前台兑换", value: "b" }
      ],
      option3: [
        { text: "最近去过", value: "a" },
        { text: "离我最近", value: "b" }
      ],
      name: ""
    };
  },
  created() {
    this.position = localStorage.getItem("cityName");
    getCinema(localStorage.getItem("cityId")).then(res => {
      if(res.status==200){
        this.list = res.data.data.cinemas.sort((a, b) => {
          a.districtName.localeCompare(b.districtName);
        });
      }
      this.sameList = this.list;

      this.list.forEach(item => {
        // 判断cinemaObj中是否有分区属性，没有就添加
        if (!this.cinemaObj[item.districtName]) {
          this.cinemaObj[item.districtName] = [];
        }
        // 往判断cinemaObj中具有相同item.districtName的属性中添加数据
        this.cinemaObj[item.districtName].push({
          cinemaId: item.cinemaId,
          name: item.name,
          address: item.address,
          lowPrice: item.lowPrice
        });
      });
      // 把每个数据里的分区名字分离出来
      this.sortCinema = Object.keys(this.cinemaObj);
      // 往option1菜单里面设置对应地区数据
      this.sortCinema.forEach((item, index) => {
        this.option1.push({
          text: item,
          value: index + 1
        });
      });
    });
  },
  updated() {
    for (var item in this.cinemaObj) {
      if (item === this.$refs.option1.displayTitle) {
        this.sameList = this.cinemaObj[item];
      }
    }
    if ("全城" === this.$refs.option1.displayTitle) {
      this.sameList = this.list;
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 0.88rem;
  line-height: 0.88rem;
  padding: 0 0.1rem;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  img {
    width: 0.12rem;
    height: 0.1rem;
  }
}
.cinemaList {
  position: fixed;
  left: 0;
  right: 0;
  top: 0.88rem;
}
.list {
  margin-top: 0.1rem;
  .cont {
    padding: 0.3rem;
    display: flex;
    justify-content: space-between;
    .name {
      font-size: 0.3rem;
    }
    .address {
      font-size: 0.24rem;
      margin-top: 0.1rem;
    }
  }
}
</style>