<template>
<div>
  <div class="back" @click="back">&lt;&lt;</div>
  <div v-html="str"></div>
</div>
</template>

<script>
import { getInfo } from "@/api";
export default {
  data() {
    return {
      str: ""
    };
  },
  methods: {
    back() {
      history.go(-1);
    }
  },
  created() {
    getInfo().then(res => {
      this.str = res.data.data.data.content;
    });
  },
};
</script>

<style lang="scss" scoped>
.back {
  position: fixed;
  width: 0.5rem;
  line-height: 0.4rem;
  border-radius: 0.15rem;
  background-color: rgba(0, 0, 0, 0.5);
  margin-left: 0.15rem;
  color: #fff;
}
</style>