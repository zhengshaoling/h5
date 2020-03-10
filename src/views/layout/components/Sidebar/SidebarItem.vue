<template>
  <div v-if="item.children" class="menu-wrapper">
    <template
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow"
    >
      <app-link :to="resolvePath(onlyOneChild.url)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.url)"
          :class="{'submenu-title-noDropdown':!isNest}"
        >
          <i v-if="item.icon" :class="item.icon" class="ufa-icon"/>
          <span>{{ generateTitle(onlyOneChild.name) }}</span>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="submenu" :index="item.name">
      <template slot="title">
        <i v-if="item.icon" :class="item.icon" class="ufa-icon"/>
        <span>{{ generateTitle(item.name) }}</span>
      </template>

      <template>
        <div v-for="child in item.children" :key="child.sn">
          <sidebar-item
            v-if="child.children&&child.children.length>0"
            :is-nest="true"
            :item="child"
            :key="child.sn"
            :base-path="resolvePath(child.url)"
            class="nest-menu"
          />

          <app-link v-else :to="resolvePath(child.url)" :key="child.sn">
            <el-menu-item :index="resolvePath(child.url)">
              <i v-if="child.icon" :class="child.icon" class="ufa-icon"/>
              <span>{{ generateTitle(child.name) }}</span>
            </el-menu-item>
          </app-link>
        </div>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import { generateTitle } from "@/utils/i18n";
import { isExternal } from "@/utils";
import AppLink from "./Link";
import FixiOSBug from "./FixiOSBug";
import pathToRegexp from "path-to-regexp";
import { getContext } from '@/utils/auth'
export default {
  name: "SidebarItem",
  components: { AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      onlyOneChild: null
    };
  },
  methods: {
    hasOneShowingChild(children, parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        if (!this.onlyOneChild || this.onlyOneChild.id !== parent.id){ // 解决“后台首页”循环渲染的问题
          this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        }
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath;
      }

      // 重构url
      const url =this.$store.getters.unionPath + routePath;
      return url;
    },
    isExternalLink(routePath) {
      return isExternal(routePath);
    },
    generateTitle
  }
};
</script>
