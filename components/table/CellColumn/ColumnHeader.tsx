import React, { useContext } from 'react';
import classnames from 'classnames';
import BodyContext from '../context/BodyContext';

interface ColumnHeaderProps {
  column: StoreKeyValue;
}

const ColumnHeader: React.FC<ColumnHeaderProps> = props => {
  const { column } = props;

  const { handleChangeSort, sortArr, prefixCls } = useContext(BodyContext);

  const { render: renderCell, ...restInfo } = column;

  const { title: colTitle, $_groupIndex: colIndex, align: colAlign, sorter } = restInfo;

  const TitleNode = (text?: string | number | React.ReactNode) => (
    <>
      <div className={`${prefixCls}-row-text`} style={{ textAlign: colAlign }}>
        {text || colTitle}
      </div>
      {sorter && (
        <div className={`${prefixCls}-header-sort`}>
          <div className={`${prefixCls}-header-sort-inner`}>
            <span
              className={classnames(
                'headr-sort-icon',
                'sort-up',
                sortArr[colIndex]?.key && sortArr[colIndex].key === 'asc' && 'active',
              )}
            ></span>
            <span
              className={classnames(
                'headr-sort-icon',
                'sort-down',
                sortArr[colIndex]?.key && sortArr[colIndex].key === 'desc' && 'active',
              )}
            ></span>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div
      className={`${prefixCls}-data-cell ${prefixCls}-header ${prefixCls}-col-header`}
      onClick={() => sorter && handleChangeSort && handleChangeSort(column)}
    >
      {(renderCell && renderCell({ ...restInfo, cellType: 'header' }, TitleNode)) || TitleNode()}
    </div>
  );
};

export default ColumnHeader;
