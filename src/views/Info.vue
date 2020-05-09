<template>
  <div v-html="str"></div>
</template>

<script>
import { getInfo } from "@/api";
export default {
  data() {
    return {
      str: ""
    };
  },
  created() {
    getInfo().then(res => {
      this.str = res.data.data.data.content;
    });
  },
};
</script>

<style>
</style>