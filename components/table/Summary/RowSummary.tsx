import React, { forwardRef } from 'react';
import classnames from 'classnames';
import BodyContext from '../context/BodyContext';
import GenerateGroup from '../Components/GenerateGroup';
import CellColumn from '../CellColumn';
import ColSummaryCell from './ColSummaryCell';
import ContentAreaHoc from '../Components/ContentAreaHoc';
import { ColumnItem } from '../interface';

/**
 * @name 表格，行总结
 */

const RowSummaryHeader = forwardRef<any>((props, ref) => {
  const { groupDeep, rowSummaryCol, prefixCls } = React.useContext(BodyContext);

  const childNode = () =>
    rowSummaryCol.map((_rs: ColumnItem, index: number) => (
      <ContentAreaHoc
        key={index}
        lastArea={index === rowSummaryCol.length - 1}
        column={_rs}
        area="header"
      >
        <CellColumn.Header column={_rs} />
      </ContentAreaHoc>
    ));

  return (
    <div
      className={`${prefixCls}-rowSummary-headers ${
        groupDeep > 0 ? 'group-deep-exist' : ''
      }`.trim()}
      id={`${prefixCls}-rowSummary-headers`}
      ref={ref}
    >
      {groupDeep > 0 ? (
        <>
          <div
            className={classnames(
              `${prefixCls}-data-cell ${prefixCls}-header`,
              'rowSummary-header',
              `rowSummary-header-${groupDeep}`,
            )}
          >
            总计
          </div>
          <div
            style={{
              display: 'flex',
            }}
          >
            {childNode()}
          </div>
        </>
      ) : (
        childNode()
      )}
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
    extraCell={<ColSummaryCell column={column} />}
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
      <GenerateGroup
        area="body"
        columnsData={rowSummaryCol}
        contentRender={column => <RowSummaryColumn column={column} hideColumnHeader />}
      />
    </div>
  );
});

RowSummary.Column = RowSummaryColumn;
RowSummary.Header = RowSummaryHeader;

export default RowSummary;
