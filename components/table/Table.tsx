import React, { useState, useEffect, useCallback } from 'react';
import LKPagination from 'raturbo-components/lib/pagination';
import classnames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import Wrapper from './Wrapper';
import { LKTable, LKTablePro, SortType, SortFn, LeafItem } from './interface';
import BodyContext from './context/BodyContext';

/**
 * @name 表格组件
 */

// 排序切换顺序映射
const SORT_INDEX: StoreKeyValue = {
  none: 'asc',
  asc: 'desc',
  desc: 'none',
};

const LKTableHoc: React.FC<LKTable & LKTablePro> = props => {
  const { dataSource, pagination, size, fixedHeader, columns } = props;

  const [sortArr, setSortArr] = useState<{ key: SortType; fn: SortFn }[]>([]);

  const prefixCls = 'tc-table';

  const handleChangePage = (page: number) => {
    if (pagination?.onChange) {
      pagination.onChange(page);
    }
  };

  const findHeaderDeep = useCallback((data: StoreKeyValue) => {
    let deep = 0;

    const recursiveFuc = (_data: StoreKeyValue) => {
      if (_data.children) {
        deep++;
        recursiveFuc(_data.children[0]);
      }
    };

    recursiveFuc(data);

    return deep;
  }, []);

  const findAllChild = (data: StoreKeyValue[], start: number): [number, StoreKeyValue[]] => {
    const arr: StoreKeyValue[] = [];
    let $_groupIndex = start;

    const recursiveFuc = (_data: StoreKeyValue[]) => {
      for (let i = 0; i < _data.length; i++) {
        const element = _data[i];
        if (!element.children) {
          element.$_groupIndex = $_groupIndex;
          arr.push(element);
          $_groupIndex++;
        } else {
          recursiveFuc(element.children);
        }
      }
    };

    recursiveFuc(data);

    return [$_groupIndex, arr];
  };

  const allLeaf = useCallback(() => {
    let $_groupIndex = 0;

    const { headers, cells } = columns.reduce(
      (total: { headers: any[]; cells: any[] }, obj: any, index: number) => {
        if (obj.children) {
          const [afterGroupIndex, arr] = findAllChild(obj.children, $_groupIndex);
          $_groupIndex = afterGroupIndex;
          total.cells.push(...arr);
          total.headers.push(obj);
        } else {
          total.cells.push({ ...obj, $_groupIndex: index });
          total.headers.push({
            ...obj,
            $_groupIndex: index,
          });
        }
        return total;
      },
      { headers: [], cells: [] },
    );

    return {
      headers,
      cells,
    };
  }, [columns]);

  useEffect(() => {
    const groupDeep = findHeaderDeep(columns[0]);

    let _sortArr: { key: SortType; fn: SortFn }[] = [];

    if (groupDeep === 0) {
      _sortArr = columns.map(
        obj =>
          ({
            key: obj.defaultSortOrder,
            fn: obj.sorter,
          } as { key: SortType; fn: SortFn }),
      );
    } else {
      _sortArr = allLeaf().cells.map(
        leaf =>
          ({
            key: leaf.defaultSortOrder,
            fn: leaf.sorter,
          } as { key: SortType; fn: SortFn }),
      );
    }

    setSortArr(_sortArr);
  }, [columns, findHeaderDeep, allLeaf]);

  const handleChangeSort = React.useCallback(
    (column: LeafItem) => {
      const { $_groupIndex: index, sorter } = column;

      // 切换后的排序规则
      const sortKey = sortArr[index].key || 'none';

      // 同时只有一列排序
      const _sortArr: { key: SortType; fn: SortFn }[] = sortArr.map(() => ({
        key: undefined,
        fn: null,
      }));

      _sortArr[index] = {
        key: SORT_INDEX[sortKey],
        fn: sorter,
      };

      setSortArr(_sortArr);
    },
    [sortArr],
  );

  const handleSortData = useCallback(
    (
      sortInfo: {
        key: SortType;
        fn: SortFn;
      }[],
      sortData: any[],
    ) => {
      for (let i = sortInfo.length - 1; i >= 0; i--) {
        const sorter = sortInfo[i];

        if (sorter) {
          sortData.sort((a, b) => {
            if (!sorter.fn) return null;
            if (sorter.key === 'asc') {
              return sorter.fn(a, b);
            }
            if (sorter.key === 'desc') {
              return sorter.fn(b, a);
            }
            return null;
          });
        }
      }

      return sortData;
    },
    [],
  );

  const BodyContextValues = React.useMemo(() => {
    const { cells, headers } = allLeaf();

    const orderedData = sortArr.some(sa => sa.key === 'none')
      ? dataSource
      : handleSortData(sortArr, cloneDeep(dataSource));

    let _page = 1;
    let _pageSize = 10;

    if (pagination) {
      _page = pagination.current;
      _pageSize = pagination.pageSize || dataSource.length;
    }

    let pageData = orderedData.slice((_page - 1) * _pageSize, _page * _pageSize);

    // 此处为伪处理，后端分页时内部分页将无法准确slice出数据
    if (pageData.length === 0) {
      pageData = orderedData.slice(0, _pageSize);
    }

    const groupDeep = findHeaderDeep(columns[0]);

    return {
      ...props,
      groupDeep,
      pageSize: _pageSize,
      page: _page,
      pageData,
      handleChangeSort,
      cellLeafs: cells,
      headerLeafs: headers,
      sortArr,
      prefixCls,
      autoFillGroup: true,
      renderId: Math.random()
        .toString(36)
        .substr(2),
    };
  }, [props, dataSource, handleChangeSort, sortArr, pagination, columns, findHeaderDeep, allLeaf]);

  return (
    <BodyContext.Provider value={BodyContextValues}>
      <div
        className={classnames(
          prefixCls,
          `${prefixCls}-size-${size || 'mini'}`,
          fixedHeader && `${prefixCls}-fixed-header`,
        )}
      >
        <Wrapper />
        {dataSource.length !== 0 && pagination && (
          <div className={`${prefixCls}-pagination`}>
            <LKPagination
              total={pagination.total || dataSource.length}
              pageSize={pagination.pageSize || 10}
              current={pagination.current}
              onChange={handleChangePage}
            />
          </div>
        )}
      </div>
    </BodyContext.Provider>
  );
};

export default LKTableHoc;
