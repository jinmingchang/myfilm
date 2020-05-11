<template>
  <div>
    <div class="top">
      <div class="top_t">
        <span class="back" @click="back">&lt;</span>
        <span>当前城市-</span>
        <span>{{city}}</span>
      </div>
      <div class="search">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" placeholder="输入城市名或者拼音" @focus="state=true" @input="search" ref="search" @keyup.backspace="search"/>
        <i class="iconfont icon-qa-close" v-show="status" @click="empty"></i>
        <span class="cancelBtn" v-if="state" @click="cancel">取消</span>
      </div>
    </div>
    <div class="hotPart" v-show="!list.length">
      <div class="yourCity">GPS定位您所在的城市</div>
      <div>
        <span class="cityName">{{city}}</span>
      </div>
      <div class="hotCity">热门城市</div>
      <ul class="list">
        <li class="hotCityName" v-for="item in hotCitys" :key="item.cityId" @click="saveCityIdName(item.name,item.cityId,1)">{{item.name}}</li>
      </ul>
    </div>
    <!-- <div id="box" style="width:100%;height:300px" v-show="false"></div> -->
    <!-- 侧边导航 -->
    <van-index-bar class="positionCont" v-show="positionStatus">
      <div v-for="(item,index) in letter" :key="index">
        <!-- 大写首字母 -->
        <van-index-anchor :index="item" class="UpperLetter"></van-index-anchor>
        <!-- 内容 -->
        <van-cell
          :title="val.name"
          v-for="val in cityObj[item]"
          :key="val.cityId"
          @click="saveCityIdName(val.name,val.cityId,1)"
        />
      </div>
    </van-index-bar>
    <ul v-show="searchStatus" class="searchList">
      <li v-for="i in list" :key="i.id" @click="saveCityIdName(i.name,i.id,1)">{{i.name}}</li>
    </ul>
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
      status:false,
      state:false,
      positionStatus:true,
      searchStatus:false,
      text:"",
      list:[],        //  存放搜索的城市信息
      city: '',       //  存放定位到的城市名
      sortCities: [], //  排好序的城市列表
      cityObj: {},    //  存放首字母和城市信息：{A:{cityId:1212,name:....},B{cityId:561551,name...}...}
      letter: [],     //  存放首字符
      hotCitys:[]     //  存放热点城市形式信息
    };
  },
  mounted() {
  },
  created() {
    this.$nextTick(()=>{
      this.city = localStorage.getItem("cityName") || "定位失败";
    })
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

        // 把热点城市提取出来
        if(item.isHot!==0){
          this.hotCitys.push(item)
        }
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
    saveCityIdName(name,id,back) {
      localStorage.setItem("cityName", name);
      localStorage.setItem("cityId", id);
      this.setName(name);
      this.setId(id);
      // 如果有参数back,就代表是点击触发，而不是定位函数调用
      if(back){
        history.go(-1);
      }
    },
    back(){
      history.go(-1)
    },
    empty(){
      this.status=false;
      this.$refs.search.value = "";
    },
    cancel(){
      this.state=false;
    },
    // 按下清除按钮也是触发该事件
    search(){
      // 如果输入为空
      if(this.$refs.search.value==""){
        this.searchStatus=false;
        this.positionStatus=true;
      }
      // 输入不为空
      else{
        this.list.splice(0);
        this.status=true;
        this.searchStatus=true;
        this.positionStatus=false;
        this.sortCities.forEach(item=>{
          if(item.name.includes(this.$refs.search.value) || item.pinyin.includes(this.$refs.search.value)){
            this.list.push({
              name:item.name,
              id:item.cityId
            })
          }
        })
      }
      // 查找后继续进一步精确查找
      // else{
      //   this.list = this.list.filter(item=>{
      //     return item.name == this.$refs.search.value || item.pinyin == this.$refs.search.value;
      //   })
      // }
    }
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/iconfont.css';
.positionCont {
  // margin-top: 6rem;
  .UpperLetter {
    background-color: rgba(235, 230, 230, 1);
  }
  .van-index-bar__sidebar {
    background-color: #fff;
  }
}
.top {
  z-index: 2;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  background-color: #fff;
  .top_t {
    position: relative;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    .back {
      position: absolute;
      left: 0.4rem;
    }
  }
  .search {
    padding: 0.2rem 0.6rem;
    background-color: rgb(235, 230, 230);
    display: flex;
    input {
      width: calc(100% - .8rem);
      line-height: .6rem;
      border: 0;
    }
    i{
      text-align:center;
      width:.8rem;
      line-height:.6rem;
      background-color:#fff;
    }
    .cancelBtn{
      width:1rem;
      height:.6rem;
      line-height:.6rem;
      padding:.04rem;
      margin-left:.06rem;
    }
  }
}
.hotPart {
  margin-top:1.92rem;
  padding: 0.3rem 0 0 0.3rem;
  .yourCity {
    font:.26rem/1 "";
    margin-bottom: 0.2rem;
  }
  .cityName {
    line-height: 0.6rem;
    margin: 0.6rem 0;
    background-color: #f4f4f4;
    padding: 0.1rem 0.2rem;
  }
  .hotCity {
    margin: 0.4rem 0;
    font:.26rem/1 "";
    margin-bottom: 0.2rem;
  }
  .list {
    display: flex;
    .hotCityName {
      margin: 0.16rem 0.4rem 0.4rem 0;
      background-color: #f4f4f4;
      padding: 0.1rem 0.2rem;
    }
  }
}
.searchList{
  margin-top:1.92rem;
}
</style>