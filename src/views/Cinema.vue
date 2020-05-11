<template>
  <div>
    <Top :position="position"></Top>
    <div class="cinemaList" @click="getReception">
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" ref="option1" />
        <van-dropdown-item v-model="value2" :options="option2" ref="option2" />
        <van-dropdown-item v-model="value2" :options="option3" />
      </van-dropdown-menu>
    </div>
    <ul class="list" v-show="listStatus">
        <li v-for="item in sameList" :key="item.cinemaId" class="cont" @click="toCinemaFilm(item.cinemaId)">
          <div class="left">
            <div class="name">{{item.name}}</div>
            <div class="address">{{item.address}}</div>
          </div>
          <div>
            <div class="price">￥{{item.lowPrice}}起</div>
          </div>
        </li>
    </ul>
    <ul v-show="!listStatus" class="receptionList">
      <li v-for="val in filterReceptionList" :key="val.cinemaId" class="receptionCont" @click="toReception(val.cinemaId)">
        <div class="name">{{val.name}}</div>
        <div>
          <span v-for="i in val.ticketTypes" :key="i.id" class="ticket">{{i.name}}</span>
        </div>
        <div class="address">{{val.address}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getCinema } from "@/api";
import { getReception } from "@/api";
import Top from "./cinema/Top";
export default {
  data() {
    return {
      str:"",
      listStatus: true,
      list: [], //  存放排好序的请求的数据
      sameList: [], //  用于切换地区存放数据
      position: "", //  存放定位地点
      cinemaObj: {}, //  存放分区信息：{xx区:{xxx:{},xxx:{}}}
      sortCinema: [], //  存放分区名
      receptionList: [], // 存放前台兑换的地区信息
      value1: 0,
      value2: "a",
      option1: [{ text: "全城", value: 0 }],
      option2: [
        { text: "APP订票", value: "a" },
        { text: "前台兑换", value: "b" }
      ],
      option3: [
        { text: "最近去过", value: "a" },
        { text: "离我最近", value: "b" }
      ],
      name: "",
      backup:[],
    };
  },
  computed:{
    filterReceptionList(){
      return this.receptionList.filter(item=>item.districtName.includes(this.str));
    }
  },
  created() {
    this.position = localStorage.getItem("cityName");
    getCinema(localStorage.getItem("cityId")).then(res => {
      if (res.status == 200) {
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
       this.option1.forEach(i=>{
          this.backup.push(i);
        });
    });

    // 获取前台兑换的信息
    getReception(localStorage.getItem("cityId")).then(res => {
      this.receptionList = res.data.data.cinemas;
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
    if (this.$refs.option2.displayTitle == "前台兑换") {
      this.listStatus = false;
    } else {
      this.listStatus = true;
    }
  },
  components: {
    Top
  },
  methods: {
    getReception(event) {
      if (event.toElement.innerText == "前台兑换") {
        // 改变区的名字
        this.option1.splice(0,this.option1.length);
        // 去除重复数据
        var obj={};
        this.receptionList.forEach((item, index) => {
          if(!obj[item.districtName]){
            obj[item.districtName] = true;
            this.option1.push({
              text: item.districtName,
              value: index + 1
            })
          }
        });
        this.option1.unshift({text:"全城",value:0})
      } 
      else if(event.toElement.innerText == "APP订票"){
        this.option1 = this.backup;
      }
      this.receptionList.forEach(item =>{
        if(item.districtName===event.toElement.innerText){
          // 用于计算receptionList
          this.str = item.districtName;
        }
        // 如果显示的是全城，就让全部信息都显示
        if(event.toElement.innerText==="全城"){
          this.str="";
        }
      })
    },
    toCinemaFilm(id){
      this.$router.push({
        name:"cinemafilm",
        params:{cinemaId:id},
        query:{"k":Date.now()}
      })
    },
    toReception(id){
      this.$router.push({
        name:"cinemareception",
        params:{cinemaId:id},
        query:{k:Date.now()}
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.cinemaList {
  position: fixed;
  left: 0;
  right: 0;
  top: 0.88rem;
}

.list {
  margin-top: 1.8rem;
  .cont {
    padding: 0.3rem;
    display: flex;
    justify-content: space-between;
    .left{
      width:4.8rem;
      .name {
        font-size: 0.3rem;
      }
      .address {
        font-size: 0.24rem;
        margin-top: 0.1rem;
      }
    }
  }
}
.receptionList {
  margin-top: 1.8rem;
  .receptionCont {
    padding: 0.3rem;
    .name {
      font-size: 0.3rem;
    }
    .ticket {
      margin-top: 0.08rem;
      font-size: 0.24rem;
    }
    .address {
      font-size: 0.24rem;
      margin-top: 0.12rem;
    }
  }
}
</style>