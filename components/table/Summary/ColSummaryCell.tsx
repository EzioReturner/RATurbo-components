import React from 'react';
import classnames from 'classnames';
import BodyContext from '../context/BodyContext';
import { ColumnItem } from '../interface';

const ColSummaryCell: React.FC<{
  className?: string;
  column: ColumnItem;
}> = props => {
  const { className, column } = props;

  const { dataKey } = column;

  const { colSummaryData, prefixCls } = React.useContext(BodyContext);

  if (!colSummaryData) {
    return null;
  }

  return (
    <div
      className={classnames(`${prefixCls}-summary-cell ${prefixCls}-data-cell`, className)}
      style={{ textAlign: column?.align }}
    >
      {colSummaryData[dataKey as string]}
    </div>
  );
};

export default ColSummaryCell;
