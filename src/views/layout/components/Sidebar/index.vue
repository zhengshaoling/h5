<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item
        v-for="route in menu_routers"
        :key="route.sn"
        :item="route"
        :base-path="route.url"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import { getAuthorizedItem } from "@/api/login";
import { treeData } from "@/utils/tree";
export default {
  components: { SidebarItem },
  data() {
    return {
      menu_routers: []
    };
  },
  watch: {
    '$store.getters.userInfo': {
      handler(newName, oldName) {
        // console.log('demand.subject changed');
        if(newName){
          this.getMume();
        }
      },
      immediate: true,
      // deep: true
    }
  },
  computed: {
    ...mapGetters([
      // 'permission_routers',
      "sidebar"
    ]),
    isCollapse() {
      return false && !this.sidebar.opened;
    }
  },
  mounted() {
    this.getMume();
  },
  methods: {
    getMume() {
      // getAuthorizedItem().then(response => {
      //   const list = treeData(response);
      //   this.menu_routers = list;
      // });
      const superAdminMenu = [
        {
          "id": 1,
          "pid": 0,
          "name": "系统管理",
          "url": "/",
        },
        {
          "id": 11,
          "pid": 1,
          "name": "组织管理",
          "url": "/org",
        },
        {
          "id": 12,
          "pid": 1,
          "name": "用户管理",
          "url": "/user",
        },
        {
          "id": 16,
          "pid": 1,
          "name": "供需管理",
          "url": "/demandMgtAll",
        }
        ];
      const orgAdminMenu = [
        {
          "id": 1,
          "pid": 0,
          "name": "系统管理",
          "url": "/",
        },
        {
          "id": 13,
          "pid": 1,
          "name": "组织管理",
          "url": "/orgManager",
        },
        {
          "id": 15,
          "pid": 1,
          "name": "供需管理",
          "url": "/demandMgt",
        },
        {
          "id": 14,
          "pid": 1,
          "name": "达成合作管理",
          "url": "/demand",
        }
      ];
      let userType = this.$store.getters.userInfo.userType;
      let orgId = this.$store.getters.userInfo.admOrgId;
      let menuJson = [];
      // console.log("// userType : ", userType);
      if(userType === 2 && orgId > 0) {
        menuJson = orgAdminMenu;
      } else if(userType === 3) {
        menuJson = superAdminMenu;
      }
      // console.log("// list : ", menuJson);
      const list = treeData(menuJson);
      // console.log("// menulist : ", list);
      this.menu_routers = list;
    }
  }
};
</script>
