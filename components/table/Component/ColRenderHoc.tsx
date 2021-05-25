import React from 'react';
import classnames from 'classnames';
import { ColumnItem } from '../interface';

interface ColRenderHocProps {
  lastArea: boolean;
  column: ColumnItem;
  children: React.ReactNode;
  area: 'header' | 'body';
  prefixCls: 'string';
}

const ColRenderHoc = (props: ColRenderHocProps) => {
  const { lastArea, column, children, prefixCls } = props;

  const { width, $_groupIndex } = column;

  return (
    <div
      className={classnames(
        `${prefixCls}-content-area`,
        lastArea && `${prefixCls}-content-last-area`,
      )}
      id={$_groupIndex === undefined ? undefined : `${prefixCls}-content-area-${$_groupIndex}`}
      key={$_groupIndex}
      data-style-width={width}
    >
      {children}
    </div>
  );
};

export default ColRenderHoc;
