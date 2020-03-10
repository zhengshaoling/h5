import request from '@/utils/request';
const gds = '/gds';
const sys='/sys';
export function categoryList(params) {
  return request({
    url: gds + '/protected/category/get',
    method: 'get',
    params
  });
}

// 根据级数获取三级分类
export function findByLevel(params) {
  return request({
    url: gds + '/protected/category/findByLevel',
    method: 'get',
    params
  });
}

// 地址三级
export function Level3Areas() {
  return request({
    url: '/sys/district/Level3Areas',
    method: 'get'
  });
}

// 根据地区code获取地址对象树
export function getAddressTree(disCode) {
  return request({
    url: sys+`/district/getAddressTree/${disCode}`,
    method: 'get'
  });
}

// 根据级数获取三级分类
export function findByLevelUnprotected(params) {
  return request({
    url: gds + '/category/findByLevel',
    method: 'get',
    params
  });
}

export function fileUpload2(data) {
  return request({
    url: '/upload/uni.UnionVO/fileUpload2',
    method: 'post',
    data
  });
}

export function getCode(data) {
  return request({
    url: '/msg/sendSmsCode',
    method: 'post',
    data
  });
}

export function districtByPid(pid) {
  return request({
    url: '/district/findByPid?pid='+pid,
    method: 'get'
  });
}