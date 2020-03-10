<template>
  <el-dropdown :hide-on-click="false">
    <span class="el-dropdown-link filter-item">
      <i class="ufa-icon ufa-icon-yingyongpeizhi"/>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate">全选</el-checkbox>
      </el-dropdown-item>
      <el-dropdown-item v-for="columnItem in columns" :key="columnItem.name">
        <el-checkbox v-model="columnItem.show">{{ columnItem.name }}</el-checkbox>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: "UfaTableColumnPicker",
  props: {
    columns: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    checkAll: {
      get() {
        for (const col of Object.keys(this.columns)) {
          if (!this.columns[col].show) {
            return false;
          }
        }
        return true;
      },
      set(val) {
        if (val) {
          for (const col of Object.keys(this.columns)) {
            this.columns[col].show = true;
          }
        } else {
          for (const col of Object.keys(this.columns)) {
            this.columns[col].show = false;
          }
        }
      }
    },
    // 判断是否部分选中
    isIndeterminate() {
      let checkNum = 0;
      const columnKeys = Object.keys(this.columns);
      for (const col of columnKeys) {
        if (this.columns[col].show) {
          checkNum++;
        }
      }

      return checkNum > 0 && checkNum < columnKeys.length;
    }
  }
};
</script>

<style scoped>

</style>
