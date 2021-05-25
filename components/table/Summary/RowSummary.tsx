import React, { forwardRef } from 'react';
import classnames from 'classnames';
import BodyContext from '../context/BodyContext';
import GenerateGroup from '../Component/GenerateGroup';
import CellColumn from '../CellColumn';
import ColSummaryCell from './ColSummaryCell';
import { ColumnItem } from '../interface';

const RowSummaryHeader = forwardRef<any>((props, ref) => {
  const { groupDeep, rowSummaryCol, prefixCls } = React.useContext(BodyContext);

  return (
    <div
      className={`${prefixCls}-rowSummary-headers`}
      id={`${prefixCls}-rowSummary-headers`}
      ref={ref}
    >
      {groupDeep > 0 && (
        <div
          className={classnames(
            `${prefixCls}-data-cell ${prefixCls}-header`,
            'rowSummary-header',
            `rowSummary-header-${groupDeep}`,
          )}
        >
          总计
        </div>
      )}
      <div
        style={{
          display: 'flex',
        }}
      >
        {rowSummaryCol.map((_rs: StoreKeyValue, index: number) => (
          <div className={`${prefixCls}-content-area`} key={index}>
            <CellColumn.Header column={_rs} />
          </div>
        ))}
      </div>
    </div>
  );
});

const RowSummaryColumn: React.FC<{ hideColumnHeader?: boolean; column: ColumnItem }> = ({
  hideColumnHeader,
  column,
}) => (
  <CellColumn
    header={!hideColumnHeader}
    column={column as ColumnItem}
    extraCell={<ColSummaryCell column={column} value={column.totalData} />}
  />
);

const RowSummary: any = forwardRef<any, { hideTitle?: boolean }>((props, ref) => {
  const { rowSummaryCol, prefixCls } = React.useContext(BodyContext);
  const { hideTitle } = props;

  return (
    <div
      className={`${prefixCls}-rowSummary-contianer`}
      id={`${prefixCls}-rowSummary-contianer`}
      ref={ref}
    >
      {!hideTitle && <RowSummaryHeader />}
      <div
        style={{
          borderLeft: '1px solid #f1f1f1',
        }}
      >
        <GenerateGroup
          area="body"
          columnsData={rowSummaryCol}
          contentRender={column => <RowSummaryColumn column={column} hideColumnHeader />}
        />
      </div>
    </div>
  );
});

RowSummary.Column = RowSummaryColumn;
RowSummary.Header = RowSummaryHeader;

export default RowSummary;
