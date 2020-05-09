<template>
  <div id="hot">
    <van-list v-model="loading" :finished="finished" finished-text="敬请期待更多电影" @load="onLoad">
      <ul class="list">
        <li v-for="item in lists" :key="item.filmId" @click="todetail(item.filmId)">
          <a href="#" class="movieCont">
            <div class="pic">
              <img :src="item.poster" />
            </div>
            <div class="cont">
              <div class="contname">
                <span class="name">{{item.name}}</span>
                <span class="item">{{item.item.name}}</span>
              </div>
              <div class="evaluate">
                <span class="custom">观众评分</span>
                <span class="grade">{{item.grade}}</span>
                <span class="pay">购买</span>
              </div>
              <div class="actors">
                <span>导演</span>
                <span>{{item.director}}</span>
              </div>
              <div class="detail">
                <span>{{item.nation}}| {{item.language}} | {{item.runtime}}分钟</span>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { getMovie } from "@/api";

export default {
  data() {
    return {
      lists: [],
      loading: false, //不是正在加载，可以请求数据
      finished: false // 是否加载完成
    };
  },
  created() {
    // this.getdata()
  },
  computed: {
    ...mapState(["hot", "list"])
  },
  methods: {
    ...mapMutations({
      setList: "hot/setList",
      setId: "hot/setId"
    }),
    ...mapActions({
      getdata: "hot/getList"
    }),
    todetail(id) {
      this.$router.push({
        name: "hotdetail",
        params: { id: id },
        query: { time: Date.now() }
      });
    },
    onLoad() {
      this.getData();
    },
    getData() {
      getMovie(1).then(res => {
        this.lists = this.lists.concat(res.data.data.films);
        this.setList(this.lists)
        this.loading = false;
        if ((this.lists.length >= 1)) {
          this.finished = true;
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
#hot {
  margin: 0 0.15rem;
  .movieCont {
    display: flex;
    padding: 0.3rem;
    height: 2rem;
    div {
      margin: 0.03rem 0;
    }
    .pic {
      width: 1.3rem;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .cont {
      flex: 1;
      padding-left: 0.2rem;
      .item {
        color: #fff;
        background-color: #999;
      }
    }
    .grade {
      margin: 0 1rem 0 0.3rem;
    }
    .pay {
      color: #f66000;
      border: 1px solid #f66000;
      padding: 0.02rem;
    }
  }
}
</style>