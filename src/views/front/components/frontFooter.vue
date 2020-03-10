<template>
  <div class="bottom_nav">
    <ul>
      <li
        v-for="item in navList"
        :key="item.label"
        :class="active === item.key?'active':''"
        @click="jump(item.url)"
      >{{ item.label }}</li>
    </ul>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
<script>
import { getUploadsUrl } from "@/utils/auth";

export default {
  props: ['active'],
  data() {
    return {
      uploadUrl: getUploadsUrl() || process.env.UPLOADS_URL,
      navList: [
        { label: "首页", key: "1", url: "/index" }
      ]
    };
  },
  methods: {
    jump(name) {
      this.$router.push(this.$store.getters.unionPath + name);
    }
  }
};
</script>
