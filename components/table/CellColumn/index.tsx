import React, { useContext } from 'react';
import DataColumn from './ColumnContent';
import { ColumnItem } from '../interface';
import ColumnHeader from './ColumnHeader';
import BodyContext from '../context/BodyContext';

interface CellProps {
  column: ColumnItem;
  header?: boolean | React.ReactNode;
  slicedData?: any[];
  extraCell?: React.ReactNode;
}

const CellColumn: any = (props: CellProps) => {
  const { column, header, slicedData, extraCell } = props;

  const { prefixCls } = useContext(BodyContext);

  const { $_groupIndex } = column;

  const Header = typeof header === 'boolean' && header ? <ColumnHeader column={column} /> : header;

  return (
    <div
      className={`${prefixCls}-cell-group-content`}
      key={$_groupIndex || column.title || column.id || column.dataKey}
    >
      {Header}
      <DataColumn column={column} slicedData={slicedData} />
      {extraCell}
    </div>
  );
};

CellColumn.DataColumn = DataColumn;

CellColumn.Header = ColumnHeader;

export default CellColumn;
