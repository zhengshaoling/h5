<template>
  <div class="block">
    <el-cascader
      placeholder="输入分类名"
      :options="listData"
      @change="handleItemChange"
      v-model="option"
      :props="props"
      filterable
      change-on-select
      style="width:300px"
    ></el-cascader>
  </div>
</template>
<script>
import { categoryList } from "@/api/common";
import { treeList } from "@/utils/tree";
export default {
  data() {
    return {
      listData: [],
      props: {
        label: "name",
        value: "id",
        children: "children"
      }, 
      option:[]
    };
  },
  props: ['categoryOption'],
  watch:{
      categoryOption: {
    　　handler() {
      　　this.option=this.categoryOption;
    　　},
    　　immediate: true
    }
  },
  mounted() {  
    this.list();
  },
  methods: {
    list() {
      categoryList().then(res => {
        this.listData = treeList(res.list);
      });
    },
    handleItemChange(val) {
      this.$emit("category", val); 
    }
  }
};
</script>

