<template>
  <el-pagination
    v-if="page"
    :current-page="page.pageNo"
    :page-sizes="defaultPageSizeArray"
    :page-size="page.pageSize"
    :total="page.totalSize"
    style="margin: 10px auto;text-align: center;"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"/>
</template>

<script>
import { defaultPage, defaultPageSizeArray } from "@/utils/default";

export default { 
  props: {
    page: {
      type: Object,
      default(){
        return defaultPage();
      }
    }
  },
  data: function() {
    return {
      defaultPageSizeArray
    };
  },
  methods: {
    handleSizeChange(size) {
      this.page.pageSize = size;
      this.$emit('paging', this.page);
    },
    handleCurrentChange(pageNo) {
      this.page.pageNo = pageNo;
      this.$emit('paging', this.page);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
