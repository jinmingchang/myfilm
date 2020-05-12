<template>
  <div>
    <div class="back" @click="back">&lt;&lt;</div>
    <div v-for="item in list" :key="item.filmId">
      <div>
        <img :src="item.poster" class="listimg"/>
      </div>
      <div class="cont">
        <div>
          <span class="name">{{item.name}}</span>
          <span class="type">{{item.item.name}}</span>
          <span class="evaluate">{{item.grade}}分</span>
        </div>
        <div>
          <span class="category">{{item.category}}</span>
        </div>
        <div>
          <span>{{item.nation}}</span>
          <span>{{item.runtime}}分钟</span>
        </div>
        <div>
          <span>{{item.premiereAt | formatDate}}</span>
        </div>
        <p>{{item.synopsis}}</p>
      </div>
      <div @click="toCinemaBuy(item.filmId)" class="footer">选座购票</div>
    </div>
  </div>
</template>

<script>
import { getDetail } from "@/api";
export default {
  data() {
    return {
      id: 0,
      list: []
    };
  },
  // 根据id获取电影相关数据
  created() {
    getDetail(this.id).then(res => {
      this.list.push(res.data.data.film);
    });
  },
  // 监听Hot路由传过来的id
  watch: {
    $route: {
      handler(n) {
        this.id = n.params.id;
      },
      immediate: true
    }
  },
  // 点击返回按钮回退页面
  methods: {
    back() {
      history.go(-2);
    },
    toCinemaBuy(id){
      this.$router.push({
        name:"cinemabuy",
        params:{filmId:id},
        query:{k:Date.now()}
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.back {
  position: fixed;
  top: 0.2rem;
  left: 0.2rem;
  width: 0.5rem;
  line-height: 0.5rem;
  border-radius: 0.5rem;
  padding: 0.06rem;
  color: #fff;
  text-align: center;
  background: rgba($color: #f66600, $alpha: 0.5);
}
.listimg{
  width:100%;
}
.cont {
  padding: 0 0.4rem;
  font: 0.32rem/.4rem "";
  p {
    text-indent: 0.64rem;
  }
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  line-height: 0.7rem;
  text-align: center;
  background-color: #f66600;
  color: #fff;
}
</style>