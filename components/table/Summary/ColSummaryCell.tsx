import React from 'react';
import classnames from 'classnames';
import BodyContext from '../context/BodyContext';
import { ColumnItem } from '../interface';

const ColSummaryCell: React.FC<{
  value?: any;
  className?: string;
  column: ColumnItem;
}> = props => {
  const { value, className, column } = props;

  const { dataKey } = column;

  const { colSummaryData, prefixCls } = React.useContext(BodyContext);

  if (!colSummaryData) {
    return null;
  }

  return (
    <div
      className={classnames(`${prefixCls}-summary-cell summary-background-color`, className)}
      style={{ textAlign: column?.align }}
    >
      {value ||
        //   ($_groupIndex === 0 ? (
        //     <div
        //       style={{
        //         width: '100%',
        //         textAlign: 'center',
        //       }}
        //     >
        //       总计
        //     </div>
        // ) :
        colSummaryData[dataKey as string]}
    </div>
  );
};

export default ColSummaryCell;
