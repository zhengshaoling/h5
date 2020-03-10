<template>
  <div>
    <div class="filter-container">
      <el-form :inline="true" :model="params" label-width="105px" label-suffix=":">
        <el-form-item v-for="(item,index) in commonList" :key="index" :label="item.label">
          <el-input v-if="item.type==='input'" v-model.trim="params[item.name]" :placeholder="item.label" class="filter-item" clearable />
          <el-select v-if="item.type==='select'" v-model.trim="params[item.name]" :placeholder="item.label" class="filter-item" style="width: 100%;">
            <el-option v-if="!item.closeAll" :value="typeof(params[item.name])=='string'?'':null" label="全部" />
            <el-option v-for="(enumValue,enumKey) in item.list" :key="enumKey" :label="enumValue[item.labelKey]" :value="enumValue[item.valueKey]" />
          </el-select>
          <el-switch v-if="item.type==='switch'" v-model="params[item.name]" :active-value="item.activeValue" :inactive-value="item.inactiveValue" active-color="#FF9C00" inactive-color="#dcdfe6" />
          <el-row v-if="(item.type=='datetime') || (item.type=='date')">
            <el-col :span="11">
              <el-date-picker
                v-model="params[item.startName]"
                :type="item.type"
                :format="item.format"
                :value-format="getDateFormat(item.type)"
                :editable="false"
                placeholder="起始日期"
                class="filter-item fff"
                style="width: 100%;"
              />
            </el-col>
            <el-col :span="2" class="line" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-date-picker
                v-model="params[item.endName]"
                :type="item.type"
                :format="item.format"
                :value-format="getDateFormat(item.type)"
                :editable="false"
                placeholder="结束日期"
                class="filter-item fff"
                style="width: 100%;"
              />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button v-popover:advanced v-if="popoverList.length>0" type="primary">高级搜索</el-button>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>

      </el-form>
    </div>

    <el-popover v-if="popoverList.length>0" ref="advanced" placement="bottom-start" width="500" trigger="click">
      <el-form :model="params" label-width="105px" label-suffix=":" style="width: 450px;padding-left:20px;">
        <el-form-item v-for="item in formData.popoverList" :key="item.name" :label="item.label">
          <!--input-->
          <el-input v-if="item.type==='input'" v-model.trim="params[item.name]" :placeholder="item.label" class="filter-item" clearable />
          <!--select-->
          <el-select v-if="item.type==='select'" v-model.trim="params[item.name]" :placeholder="item.label" class="filter-item" style="width: 100%;">
            <el-option v-if="!item.closeAll" :value="typeof(params[item.name])=='string'?'':null" label="全部" />
            <el-option v-for="(enumValue,enumKey) in item.list" :key="enumKey" :label="enumValue[item.labelKey]" :value="enumValue[item.valueKey]" />
          </el-select>
          <!--开关-->
          <el-switch v-if="item.type==='switch'" v-model="params[item.name]" :active-value="item.activeValue" :inactive-value="item.inactiveValue" active-color="#FF9C00" inactive-color="#dcdfe6" />
          <!---日期-->
          <el-row v-if="(item.type=='datetime') || (item.type=='date')">
            <el-col :span="11">
              <el-date-picker
                v-model="params[item.startName]"
                :type="item.type"
                :format="item.format"
                :value-format="getDateFormat(item.type)"
                placeholder="起始日期"
                class="filter-item fff"
                style="width: 100%;"
              />
            </el-col>
            <el-col :span="2" class="line" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-date-picker
                v-model="params[item.endName]"
                :type="item.type"
                :format="item.format"
                :value-format="getDateFormat(item.type)"
                placeholder="结束日期"
                class="filter-item fff"
                style="width: 100%;"
              />
            </el-col>
          </el-row>
        </el-form-item>

      </el-form>
    </el-popover>

  </div>
</template>

<script>
export default {
  name: 'UfaSearchForm',
  props: {
    formData: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      params: {}
    }
  },
  computed: {
    commonList() {
      return this.formData.commonList
    },
    popoverList() {
      return this.formData.popoverList || []
    }
  },
  methods: {
    onSubmit() {
      this.$emit('onSubmit', this.params)
    },
    getDateFormat(type) {
      if (type === 'date') {
        return 'yyyyMMdd'
      }
      return 'yyyyMMddHHmmss'
    },
    reset() {
      for (const item in this.params) {
        this.params[item] = ''// 先重置为空，再移除掉，防止再次查询传空值
        delete this.params[item]
      }

      this.$emit('reset')
    }
  }
}
</script>

<style scoped>
</style>
