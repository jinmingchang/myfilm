<template>
  <div id="come">
    <van-list v-model="loading" :finished="finished" finished-text="敬请期待更多电影" @load="onLoad">
      <ul>
        <li v-for="item in list" :key="item.filmId" @click="toCome(item.filmId)">
          <a href="#" class="movieCont">
            <div class="pic">
              <img :src="item.poster" />
            </div>
            <div class="cont">
              <div class="contname">
                <span class="name">{{item.name}}</span>
                <span class="item">{{item.item.name}}</span>
              </div>
              <div class="type">
                <span>类型：{{item.category}}</span>
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
import { mapState, mapMutations, mapActions } from "vuex";
import { getMovie } from "@/api";
export default {
  data() {
    return {
      list: [],
      loading: false, //不是正在加载，可以请求数据
      finished: false // 是否加载完成
    };
  },
  created() {
    // this.getData();
  },
  computed: {
    ...mapState(["come", "comemovie"])
  },
  methods: {
    ...mapActions({
      getData: "come/getData"
    }),
    ...mapMutations({
      setData: "come/setData"
    }),
    toCome(id) {
      this.$router.push({
        name: "comedetail",
        params: { id: id },
        query: { time: Date.now() }
      });
    },
    onLoad() {
      this.getList();
    },
    getList() {
      getMovie(2).then(res => {
        if (res.status == 200) {
          this.list = res.data.data.films;
          this.setData(this.list)
          this.loading = false;
          if (this.list.length >= 1) {
            this.finished = true;
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#come {
  margin: 0 0.3rem;
  .movieCont {
    display: flex;
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
    .item {
      margin-left: 0.6rem;
    }
  }
}
</style>

