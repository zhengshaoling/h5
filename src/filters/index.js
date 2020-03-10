// set function parseTime,formatTime to filter
import { parseTime } from "@/utils"; // 时间格式化
import moment from 'moment'

const pluralize = (time, label) => {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
};

const timeAgo = time => {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
};

/* 数字 格式化*/
const numberFormatter = (num, digits) => {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
};

// 千符号
const toThousandFilter = num => {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
};

// 订单专题
const status = row => {
  if (row.status === 0) {
    return "已取消";
  } else if (row.status === 1) {
    return "编辑"
  } else if (row.status === 2) {
    return "待确认"
  } else if (row.status === 3) {
    return "已确认"
  } else if (row.status === 4) {
    return "已驳回"
  } else if (row.status === 5) {
    return "已确认"
  } else if (row.status === 6) {
    return "已完成"
  } else if (row.status === 7 && row.subStatus === 0) {
    return "已挂起"
  } else if (row.status === 7 && row.subStatus === 1) {
    return "请求终止"
  } else if (row.status === 7 && row.subStatus === 2) {
    return "驳回终止"
  } else if (row.status === 7 && row.subStatus === 3) {
    return "请求变更"
  } else if (row.status === 7 && row.subStatus === 4) {
    return "驳回变更"
  } else if (row.status === 8) {
    return "结案完成"
  }
};

// 提货单状态
const takeStatus = status => {
  if (status === 1) {
    return "编辑中"
  } else if (status === 2) {
    return "待确认"
  } else if (status === 3) {
    return "待发货"
  } else if (status === 4) {
    return "已驳回"
  } else if (status === 5) {
    return "已发货"
  } else {
    return "未知状态"
  }
};

// 发货单状态
const shipStatus = val => {
  if (val === 1) {
    return "编辑中"
  } else if (val === 2) {
    return "已下单"
  } else if (val === 3) {
    return "待收货"
  } else if (val === 4) {
    return "已入库"
  } else if (val === 5) {
    return "已结算"
  } else if (val === 6) {
    return "已完成"
  } else if (val === 0) {
    return "已取消"
  } else if (val === 7) {
    return "品牌厂商待确认"
  } else if (val === 8) {
    return "驳回"
  } else {
    return "未知状态"
  }
};

// 退货单状态
const rejectStatus = val => {
  if (val === 1) {
    return "编辑中"
  } else if (val === 2) {
    return "待确认"
  } else if (val === 3) {
    return "已确认"
  } else if (val === 4) {
    return "已驳回"
  } else {
    return "未知状态"
  }
};

// 付款方式
const payType = val => {
  if (val === 1) {
    return "月结30天"
  } else if (val === 2) {
    return "月结60天"
  } else if (val === 3) {
    return "月结90天"
  } else if (val === 4) {
    return "月结45天"
  } else if (val === 5) {
    return "月结180天"
  } else if (val === 6) {
    return "预付款"
  } else if (val === 7) {
    return "货到付款"
  } else if (val === 8) {
    return "当月结"
  } else if (val === 9) {
    return "月结50天"
  } else if (val === 10) {
    return "月结80天"
  }
};

// 付款方式
const taxType = val => {
  if (val === 1) {
    return "含17%增值税[专用发票]"
  } else if (val === 10) {
    return "含16%增值税[专用发票]"
  } else if (val === 2) {
    return "含11%增值税[专用发票]"
  } else if (val === 11) {
    return "含10%增值税[专用发票]"
  } else if (val === 3) {
    return "含6%增值税[专用发票]"
  } else if (val === 4) {
    return "含3%增值税[专用发票]"
  } else if (val === 5) {
    return "不含税"
  } else if (val === 6) {
    return "含17%增值税[普通发票]"
  } else if (val === 7) {
    return "含11%增值税[普通发票]"
  } else if (val === 8) {
    return "含6%增值税[普通发票]"
  } else if (val === 9) {
    return "含3%增值税[普通发票]"
  }
};

// 下单方式
const odrType = val => {
  if (val === 0) {
    return "未知方式"
  } else if (val === 1) {
    return "直采下单"
  } else if (val === 2) {
    return "VMI下单"
  }
};

// 时间格式化 update by phh 2019/1/30
// time 可以是时间戳、字符串、Date等
// pattern 为模版，默认是YYYY-MM-DD HH:mm:ss
const formatDate = (time, pattern) => {
  if (!time) return '';
  return moment(time).format(!pattern ? 'YYYY-MM-DD HH:mm:ss' : pattern);
};

// 时间戳转换日期
const YmdDate = time => {
  if (!time) {
    return;
  }
  const date = new Date(time);
  return parseTime(date, "{y}-{m}-{d}");
};

// 时间戳转换日期时分秒
const YmdHisDate = time => {
  if (!time) {
    return;
  }
  const date = new Date(time);
  return parseTime(date, "{y}-{m}-{d} {h}:{i}:{s}");
};

// 小数点保留两位
const changeTwoDecimal = num => {
  return Math.floor(num * 100) / 100;
};

// 转字符串
const toString = num => {
  return num.toString()
};

// 保留两位小数点并且转字符串保留两位
const stringTwoDecimal = num => {
  num = Math.floor(num * 100) / 100;
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
};

const yesOrNo = val => {
  if (val === 1 || val === '1') {
    return '是';
  } else {
    return '否';
  }
};

const authEntityTransfer = (val) => {
  switch (val) {
    case 1:
      return '平台';
    case 2:
      return '供应商';
    case 3:
      return '采购商';
  }
};

const rolePlatConfigTransfer = (val) => {
  if (val === 1 || val === '1') {
    return '是';
  } else {
    return '否';
  }
};

const roleLevelTransfer = (val) => {
  switch (val) {
    case 1:
      return '超级管理员';
    case 2:
      return '管理员';
    case 3:
      return '普通角色';
  }
};

export default {
  pluralize,
  timeAgo,
  toThousandFilter,
  status,
  takeStatus,
  shipStatus,
  rejectStatus,
  taxType,
  payType,
  odrType,
  formatDate,
  YmdDate,
  YmdHisDate,
  changeTwoDecimal,
  toString,
  stringTwoDecimal,
  yesOrNo,
  authEntityTransfer,
  rolePlatConfigTransfer,
  roleLevelTransfer
};
