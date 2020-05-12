<template>
  <div id="film">
    <div class="back" @click="back">&lt;&lt;</div>
    <ul>
      <li v-for="item in cinemaList" :key="item.cinemaId">
        <div class="cinemaName">{{item.name}}</div>
        <div class="address">{{item.address}}</div>
        <div class="tel">{{item.telephones[0]}}</div>
      </li>
    </ul>
    <ul>
      <li v-for="val in cinemaDetail" :key="val.filmId">
        <div class="logo">
          <img :src="val.poster" />
        </div>
        <div class="filmName">
          <span class="name">{{val.name}}</span>
          <span class="grade">{{val.grade}}分</span>
        </div>
        <div class="more" @click="toDetail(val.filmId)">&gt;</div>
        <div class="kind">
          <span>{{val.category}} | {{val.runtime}}分钟 | 导演:{{val.director}} |</span>
          <span v-for="(i,index) in val.actors" :key="index">演员:{{i.name}}</span>
        </div>
        <div class="showDate">上映时间{{val.showDate | formatDate}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getCinemaFilm } from "@/api";
import { getCinemaDetail } from "@/api";
export default {
  data() {
    return {
      cinemaList: [],
      cinemaDetail: []
    };
  },
  created() {
    getCinemaFilm(this.$route.params.cinemaId).then(res => {
      this.cinemaList.push(res.data.data.cinema);
    });
    getCinemaDetail(this.$route.params.cinemaId).then(res => {
      this.cinemaDetail = res.data.data.films;
    });
  },
  methods: {
    back() {
      history.go(-1);
    },
    toDetail(id) {
      this.$router.push({
        name: "comedetail",
        params: { id: id },
        query: { k: Date.now() }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#film {
  text-align: center;
  .back {
    width: 0.5rem;
    line-height: 0.4rem;
    border-radius: 0.15rem;
    background-color: rgba(0, 0, 0, 0.5);
    margin: 0.2rem 0 0 0.15rem;
    color: #fff;
  }
  .cinemaName {
    padding: 0.4rem;
    padding-bottom: 0.25rem;
    // text-align: center;
    font: 0.35rem/1 "";
  }
  .address {
    // text-align: center;
    font-size: 0.2rem;
  }
  .tel {
    // text-align: center;
    font-size: 0.2rem;
  }
  .logo {
    img {
      width: 4.36rem;
      height: 6rem;
    }
    margin: 0.2rem auto;
    text-align: center;
  }
  .filmName {
    .grade {
      margin-left: 0.2rem;
      font-style: italic;
      color: #f66600;
    }
  }
  .more {
    text-align: right;
    margin-right: 0.5rem;
  }
  .kind {
    width: 6rem;
    margin: 0 auto;
    font-size: 0.28rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .showDate {
    font-size: 0.26rem;
  }
}
</style>