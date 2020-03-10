<template>
  <div>
    <div class="srmHeader">
      <div class="headerBox">
        <div class="tel">客服电话：400-9308-618（工作日 9:00-18:00）</div>
        <div class="loginState">欢迎来到{{ headerInfo.sysCnName }}，<a @click.prevent="toLogin">[登陆]</a></div>
      </div>
    </div>
    <div class="headBg">
      <div class="headTop">
        <div class="logo">
          <img :src="uploadUrl + headerInfo.loginLogo" class="logoImg">
          <span class="line"/>
          <span class="companyTitle">{{ headerInfo.sysCnName }}</span>
        </div>
        <div class="apply" @click="goRegister">申请成我们的供应商</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSrmSetupInfo } from "@/api/login";
export default {
  data() {
    return {
      headerInfo: {
        sysCnName: "",
        loginLogo: ""
      },
      uploadUrl: ''// process.env.UPLOADS_URL
    };
  },
  mounted() {
    this.getSetupInfo(); // 获取企业信息
  },
  methods: {
    getSetupInfo() {
      const paramet = this.$store.getters.company_params;
      // getSrmSetupInfo({ context: paramet }).then(res => {
      //   this.headerInfo = res.vo;
      //   this.$emit("headerInfo", res); // 赋值给父组件
      // });
    },
    goRegister() {
      // console.log(this.$store);
      const company_params = this.$store.getters.company_params;
      this.$router.push("/" + company_params + "/register");
      //   let loginForm = {
      //     account: "",
      //     password: ""
      //   };
      //   this.$store
      //     .dispatch("", loginForm)
      //     .then(() => {
      //       console.log(23);
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
      // this.$router.push('register')
    },
    toLogin(){
      const company_params = this.$store.getters.company_params;
      this.$router.push("/" + company_params + "/login");
    }
  }
};
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
.srmHeader {
  height: 35px;
  line-height: 35px;
  font-size: 12px;
  background: #f2f2f2;
  .headerBox {
    width: 1280px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .tel {
      flex-basis: 300;
    }
  }
}
.headBg {
  height: 100px;
  background: rgba(255, 255, 255, 0.86);
  .headTop {
    width: 1280px;
    padding: 20px 0;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .logo {
      flex: 1;
      line-height: 60px;
      .logoImg {
        width: 90px;
        height: 60px;
      }
      .line {
        border-left: 1px solid #ccc;
        width: 1px;
        height: 80px;
        margin: 0 15px;
        position: relative;
        top: -20px;
      }
      .companyTitle {
        color: #000;
        font-size: 24px;
        font-weight: bold;
        position: relative;
        top: -20px;
      }
    }
    .apply {
      background: red;
      color: #fff;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      border-radius: 6px;
      padding: 0 30px;
      margin-top: 15px;
      cursor: pointer;
    }
  }
}
</style>
