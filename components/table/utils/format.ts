/**
 * 根据排序规则对多维数组排序
 * @param sortArr 排序规则数组
 * @param data 需要排序的数据
 */
export function sortData(sortArr: any[], data: any[], join: boolean = true) {
  const _data = data;
  // 多维度排序，从内层往外排
  for (let i = sortArr.length - 1; i >= 0; i--) {
    const sort = sortArr[i];
    sort &&
      _data.sort((a, b) => {
        const va = a[i];
        const vb = b[i];
        if (va === vb) {
          return 0;
        }

        // 对 ‘-’ 类型数据单独排序
        if (va === '-' && vb !== '-') {
          return 1;
        }
        if (va !== '-' && vb === '-') {
          return -1;
        }

        {
          if (!isNaN(va) && isNaN(vb)) {
            return -1;
          }

          if (isNaN(va) && !isNaN(vb)) {
            return 1;
          }
        }

        // 数值型排序
        if (!isNaN(va) && !isNaN(vb)) {
          if (sort === 'asc') {
            return Number(va) > Number(vb) ? 1 : -1;
          }
          return Number(vb) > Number(va) ? 1 : -1;
        }
        // 非数值型排序
        if (sort === 'asc') {
          return va.localeCompare(vb);
        }
        return vb.localeCompare(va);
      });
  }
  return join ? _data.map(d => d.join('-')) : _data;
}
