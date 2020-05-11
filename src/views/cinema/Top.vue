<template>
  <header>
      <div class="position">
        <router-link to="/city">{{position}}</router-link>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAMAAAAIAYw9AAAAOVBMVEVHcEwZGhsZGxsZGhskJCQaGhwbGxsZHR0ZGhsZGhsZGhsZGhsZHBwaGhsaGhwZGxsaGh0bGxsZGhsAwt9XAAAAEnRSTlMA5Z7pB2scPfrK6NJskn6fcnH7htMrAAAAVElEQVQI11XNOQKAIBAEwQEXl0NQ+/+PNfDucIIabaGbnqyHXQHKfC9zgaABVD8Xr8CQlgw5SVLKkBdJ8gmIZhGY/BUoha9qKwDEz/fJJP3y1i5GB2jVA/F2X5USAAAAAElFTkSuQmCC"
        />
      </div>
      <div>影院</div>
      <div class="iconfont icon-sousuo" @click="toSearch"></div>
    </header>
</template>

<script>
export default {
    props:{
        position:{
            type:String,
            default(){
                return "";
            }
        }
    },
    methods:{
      toSearch(){
        this.$router.push("/cinemasearch")
      }
    }
}
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
</style>