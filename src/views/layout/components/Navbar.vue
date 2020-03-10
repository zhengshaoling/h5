<template>
  <div class="navbar">
    <div class="left-menu">
      <img v-if="union.pcLogo" :src="uploadsUrl+union.pcLogo" alt="">
      <span v-else class="unionName">供需管理后台</span>
    </div>
    <div class="right-menu">
      <span>{{this.$store.getters.userInfo.userName}}</span>
      <span @click="logout">[ 退出 ]</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import ErrorLog from "@/components/ErrorLog";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import LangSelect from "@/components/LangSelect";
import ThemePicker from "@/components/ThemePicker";
import { getUploadsUrl } from '@/utils/auth'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker
  },
  computed: {
    ...mapGetters(["sidebar", "name", "avatar", "device"])
  },
  data(){
    return {
      companyParams: this.$store.getters.unionPath+'/index',
      union: this.$store.getters.union,
      uploadsUrl: getUploadsUrl()|| process.env.UPLOADS_URL
    }
  },
  methods: {
    toggleSideBar() {
    },
    logout() {      
      this.$store.dispatch("FedLogOut").then(() => {
        this.$router.push(this.$store.getters.unionPath + "/login");
        // location.reload();
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .unionName{
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }
.navbar {
  position: absolute;
  top: 0;
  left: 0;
  height: 60px;
  line-height: 60px;
  border-radius: 0px !important;
  width: 100%;
  background: #304156;
  color: rgb(191, 203, 217);
  font-size: 14px;
  padding:0 20px;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .left-menu{
    float: left;
    img{
      width: 212px;
      height:37px;
      margin-top: 10px;
    }
  }
  .right-menu {
    float: right;
    height: 100%;
    a{
      margin-right: 10px;
    }
    span:hover{
      color: #fff;
      cursor: pointer;
    }
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

</style>
