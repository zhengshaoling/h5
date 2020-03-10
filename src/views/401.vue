<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <h2>你没有权限去该页面</h2>
        <h6>如有不满请联系你领导</h6>
        <ul class="list-unstyled">
          <li>或者你可以去: <a href="https://www.ufa.hk">回首页</a></li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img src="@/assets/images/401_images/401.gif" width="313" height="428">
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogVisible" title="随便看" size="large">
      <img :src="ewizardClap" class="pan-img" >
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ewizardClap: "https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646",
      dialogVisible: false
    };
  },
  methods: {
    back() {
      this.$router.push('https://www.ufa.hk')
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.errPage-container {
  width: 800px;
  margin: 100px auto;
  .pan-back-btn {
    background: #008489;
    color: #fff;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
  }
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
    }
    a {
      color: #008489;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
