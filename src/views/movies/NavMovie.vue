<template>
  <div class="tabbar">
    <ul class="tabnav">
      <li>
        <router-link to="/movie/hot">正在热映</router-link>
      </li>
      <li>
        <router-link to="/movie/comming">即将上映</router-link>
      </li>
    </ul>
    <div class="navLine" :style="{transform:`translateX(${style})`}"></div>
  </div>
</template>

<script>
export default {
  computed: {
    style() {
      return this.$route.path === "/movie/hot" ? "0" : "265%";
    }
  }
};
</script>

<style lang="scss" scoped>
.tabbar {
  height: 0.8rem;
  .tabnav {
    border-bottom: 1px solid #ccc;
    display: flex;
    line-height: 0.8rem;
    li {
      width: 50%;
      text-align: center;
    }
  }
  .navLine {
    border-bottom: 2px solid red;
    width: 1.4rem;
    position: relative;
    left: 1.2rem;
    transition: all 500ms;
  }
}
</style>