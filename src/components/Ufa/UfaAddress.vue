<template>
  <div class="block">
    <el-cascader placeholder="输入城市名" :options="listData"  @change="handleItemChange" v-model="option" :props="props" filterable change-on-select style="width:300px" :disabled="disabled"></el-cascader>
  </div>
</template>
<script>
import { Level3Areas } from "@/api/common";
export default {
  data() {
    return {
      listData: [],
      props: {
        label:'name',
        value:'code',
        children: 'children'
      },
      option:[]
    };
  },
  props: {
    disabled: {
      type: Boolean,
      default(){
        return false;
      }
    },
    code: {
      type: Array
    }
  },
  mounted() {
    this.list();
  },
   watch:{
      code: {
    　　handler() {
      　　this.option=this.code;
    　　},
      immediate: true
    }
  },
  methods: {
    list() {
      Level3Areas().then(res => {
        this.listData= res.list;
      });
    },
     handleItemChange(val) {
        this.$emit('Level3Areas',val)
    }
  }
};
</script>

