import React, { useContext, forwardRef } from 'react';
import CellColumn from '../CellColumn';
import BodyContext from '../context/BodyContext';
import ColSummaryCell from '../Summary/ColSummaryCell';
import ColumnHeader from '../CellColumn/ColumnHeader';
import GenerateGroup from '../Component/GenerateGroup';

const IndexHeader = forwardRef<any, { column?: StoreKeyValue }>((props, ref) => {
  const { groupDeep, prefixCls } = React.useContext(BodyContext);

  const _column = props.column || {
    id: Math.random()
      .toString(36)
      .substr(2),
    sort: null,
    title: '序号',
    dataIndex: 0,
    $_groupIndex: 0,
  };

  return (
    <div id={`${prefixCls}-index-header`} ref={ref}>
      {Array(groupDeep || 0)
        .fill(1)
        .map((obj, _index) => (
          <div
            className={`${prefixCls}-cell-text`}
            style={{
              borderBottom: _index === (groupDeep || 0) - 1 ? '1px solid #eaeaea' : '0',
            }}
            key={_index}
          ></div>
        ))}
      <ColumnHeader column={_column} />
    </div>
  );
});

/**
 * @name 序号列
 */
const IndexCol: any = forwardRef<any, { haveHeader?: boolean }>((props, ref) => {
  const { haveHeader } = props;

  const { page, pageSize, pageData, prefixCls } = useContext(BodyContext);

  const baseIndex = (page - 1) * pageSize;

  const indexLen = pageData.length < pageSize ? pageData.length : pageSize;

  const data = Array(indexLen)
    .fill(0)
    .map((n, index) => [baseIndex + index + 1]);

  const column = {
    id: Math.random()
      .toString(36)
      .substr(2),
    title: '序号',
    dataIndex: 0,
    $_groupIndex: 0,
  };

  return (
    <div className={`${prefixCls}-index-container`} id={`${prefixCls}-index-container`} ref={ref}>
      {haveHeader && <IndexHeader column={column} />}
      <GenerateGroup
        area="body"
        // ref={cellContainerRef}
        columnsData={[column]}
        contentRender={_column => (
          <CellColumn
            column={_column}
            slicedData={data}
            header={false}
            extraCell={<ColSummaryCell column={{ ...column, dataKey: '9999999' }} />}
          />
        )}
      />
    </div>
  );
});

IndexCol.Header = IndexHeader;

export default IndexCol;
