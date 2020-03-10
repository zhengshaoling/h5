<template>
  <div>
    <div class="header">header头部</div>
    <div class="main">
      <div class="warp">
        main主体
      </div>
    </div>
    <frontFooter active="1"/>
  </div>
</template>

<script>
import frontFooter from "./components/frontFooter";
import { index, getOrgById } from "@/api/front/index"; // 业务js
import { getUploadsUrl } from "@/utils/auth";
import "@/utils/wap.js";
export default {
  components: { frontFooter },
  data() {
    return {
      uploadUrl: getUploadsUrl() || process.env.UPLOADS_URL
    };
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.header {
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  color: #fff;
  background: linear-gradient(270deg, #ff4e18, #f10100);
  font-size: 0.32rem;
}
.main {
  padding: 0.53rem 0.3rem 1.3rem;
}
.warp {
  background: #fff;
  border-radius: 0.13rem;
  margin-bottom: 0.53rem;
  padding: 0.08rem 0.3rem 0.37rem 0.3rem;
  font-size: .32rem;
  text-align: center;
}

</style>
