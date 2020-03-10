
<template>
  <div>
    <el-table
      v-loading="queryLoading"
      v-bind="$attrs"
      :data="list"
      style="width: 100%"
      max-height="100%;"
      border
      fit
      size="mini"
      highlight-current-row
      stripe
      v-on="$listeners"
    >
      <template v-for="(item, index) in columns">
        <!-- selection 则显示多选框；如果设置了 index 则显示该行的索引（从 1 开始计算）; expand 展开行  -->
        <el-table-column v-if="item.type && item.type !== 'expand'" :key="index" :type="item.type" :label="item.label" :min-width="item.minWidth" :width="item.width" :align="item.align" />
        <el-table-column v-else-if="item.render" :key="index" :type="item.type" :min-width="item.minWidth" :width="item.width" :align="item.align" :label="item.label" :fixed="item.fixed">
          <template slot-scope="scope">
            <fm-column :row="scope" :render="item.render" />
          </template>
        </el-table-column>
        <el-table-column v-else-if="item.btns" :key="index" :min-width="item.minWidth" :width="item.width" :align="item.align" :label="item.label" :fixed="item.fixed">
          <template slot-scope="scope">
            <el-button v-for="(btn,index1) in item.btns" :key="index1" type="text" size="small" @click.native.prevent="commonTableBtnClick(scope,btn)">{{ btn.label }}</el-button>
          </template>
        </el-table-column>
        <el-table-column v-else :key="index" :min-width="item.minWidth" :width="item.width" :align="item.align" :label="item.label" :fixed="item.fixed" :prop="item.prop" :formatter="item.formatter" />
      </template>
    </el-table>
    <ufa-pagination :page="page" @paging="handlePageChange" />
  </div>
</template>

<script>
import UfaPagination from './UfaPagination'
import { defaultPage } from '@/utils/default'
export default {
  name: 'ListTable',
  components: {
    UfaPagination,
    fmColumn: {
      functional: true,
      props: {
        row: Object,
        render: Function
      },
      render(h, ctx) {
        return ctx.props.render(h, ctx.props.row)
      }
    }
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    params: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    },
    api: {
      type: Function,
      required: false,
      default: null
    }
  },
  data() {
    return {
      queryLoading: false,
      page: defaultPage(),
      list: [{
        id: 1,
        name: '小1',
        age: 20
      }]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    commonTableBtnClick(scope, btn) {
      if (btn.func) { btn.func(scope) } else { console.log('按钮找不打触发事件') }
    },
    getList() {
      if (!this.api) {
        console.log('table未传api')
      } else {
        this.queryLoading = true
        const params = {
          ...this.params,
          pageNo: this.page.pageNo,
          pageSize: this.page.pageSize
        }
        this.api(params)
          .then(res => {
            this.list = res.list
            this.page = res.page
          })
          .catch(() => {

          })
          .then(() => {
            // finally，取消 loading 状态
            this.queryLoading = false
          })
      }
    },
    handlePageChange() {
      this.getList()
    },
    // 重置页数
    _resetPage() {
      this.page = defaultPage(this.page)
    },
    // 重新加载，包括重置页数和重新请求数据
    reload() {
      this._resetPage()
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>
