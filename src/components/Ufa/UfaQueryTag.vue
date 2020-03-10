<template>
  <el-row>
    <el-tag
      v-for="queryItem in currentQuery"
      :key="queryItem.name"
      :closable="true"
      :disable-transitions="true"
      style="margin-right: 10px;"
      class="filter-item"
      @close="handleCloseTag({queryItem})"
    >
      {{ `${queryItem.name}：${queryItem.value}` }}
    </el-tag>
  </el-row>
</template>

<script>
import { parseTime } from '@/utils';
// 预定义几个格式化工具，
// formatter 属性可以直接传入函数名调用
const formatterList = {
  // 日期范围选择器
  dateRange(value) {
    if (Object.prototype.toString.call(value) === '[object Array]' && value[0] && value[1]) {
      return `从 ${parseTime(value[0], '{y}-{m}-{d}')} 到 ${parseTime(value[1], '{y}-{m}-{d}')}`;
    }
    return '';
  },
  // 普通的日期选择器
  date(value) {
    if (Object.prototype.toString.call(value) === '[object Date]') {
      return parseTime(value, '{y}-{m}-{d}');
    }
    return '';
  }
};

export default {
  name: 'UfaQueryTag',
  props: {
    queryName: {
      type: Object,
      default() {
        return {}
      }
    },
    query: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    currentQuery() {
      return Object.keys(this.query)
        .map(key => {
          const queryNameItem = this.queryName[key];
          let name, value;
          value = this.query[key];
          if (typeof queryNameItem === 'string') {
            // 如果是字符串则直接作为名字并显示输入值
            name = this.queryName[key];
          } else {
            name = queryNameItem.name;
            if (queryNameItem.enum) {
              // 如果有枚举则改为根据枚举中判断
              value = queryNameItem.enum[this.query[key]];
            }
          }
          // 支持自定义格式化
          if (this.queryName[key].formatter) {
            const formatter = this.queryName[key].formatter;
            if (typeof formatter === 'string' && formatterList[formatter]) {
              // 使用预定义的格式化
              value = formatterList[formatter](value);
            } else if (typeof formatter === 'function') {
              // 自定义的格式化
              value = formatter(value);
            } else {
              throw new TypeError('formatter 应为字符串或函数');
            }
          }
          return { key, name, value };
        })
        .filter(item => item.name && item.value);
    }
  },
  methods: {
    handleCloseTag({ queryItem }) {
      this.query[queryItem.key] = '';
      this.$emit('change', this.query);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
