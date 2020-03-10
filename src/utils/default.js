// 默认分页参数
export function defaultPage({ pageSize } = { pageSize: 10 }) {
  return {
    pageSize,
    totalSize: 0,
    pageNo: 1
  }
}

// 默认单页个数
export const defaultPageSizeArray = [10, 20, 30, 100, 500, 1000];
