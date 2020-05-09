<template>
  <div>
    <div id="box" style="width:100%;height:300px" v-show="false"></div>
    <!-- 侧边导航 -->
    <van-index-bar>
      <div v-for="(item,index) in letter" :key="index">
        <!-- 大写首字母 -->
        <van-index-anchor :index="item"></van-index-anchor>
        <!-- 内容 -->
        <van-cell
          :title="val.name"
          v-for="val in cityObj[item]"
          :key="val.cityId"
          @click="saveCityIdName(val.name,val.cityId)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { getLocation } from "@/until/location.js";
import { getCities } from "@/api";
import { mapMutations } from "vuex";
// import {mapMutations} from "vuex"
export default {
  data() {
    return {
      sortCities: [], //排好序的城市列表
      cityObj: {}, //存放首字母和城市信息：{A:{cityId:1212,name:....},B{cityId:561551,name...}...}
      letter: [] //存放首字符
    };
  },
  mounted() {
    // getLocation("box", data => {
    //   console.log(data);    //定位到的城市名
    // });
  },
  created() {
    getCities().then(res => {
      // 把获取到的城市排序
      this.sortCities = res.data.data.cities.sort((a, b) =>
        a.pinyin.localeCompare(b.pinyin)
      );
      // 提取每个数据的首字母转成大写字母
      this.sortCities.forEach(item => {
        var firstLetter = item.pinyin[0].toUpperCase();
        // 每个大写字母都放在cityObj里面，创建一个数组
        if (!this.cityObj[firstLetter]) {
          this.cityObj[firstLetter] = [];
        }
        // 把城市信息放入到上面的数组里面
        this.cityObj[firstLetter].push({
          cityId: item.cityId,
          name: item.name,
          pinyin: item.pinyin,
          isHot: item.isHot
        });
      });
      // 把城市拼音的首字母提取成一个新数组
      this.letter = Object.keys(this.cityObj);
      getLocation("box", cityName => {
        // 如果有定位
        if (cityName) {
          cityName = cityName.replace("市", "");
          // 根据名字找id
          var id = this.sortCities.filter(item => {
            return item.name === cityName;
          })[0].cityId;
          this.saveCityIdName(cityName, id);
        }
      });
    });
  },
  methods: {
    ...mapMutations({
      setName: "cityIdName/setName",
      setId: "cityIdName/setId"
    }),
    saveCityIdName(name, id) {
      localStorage.setItem("cityName", name);
      localStorage.setItem("cityId", id);
      this.setName(name);
      this.setId(id);
    }
  }
};
</script>

<style>
</style>