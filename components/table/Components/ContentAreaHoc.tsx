import React from 'react';
import classnames from 'classnames';
import { ColumnItem } from '../interface';
import BodyContext from '../context/BodyContext';

/**
 * @name 表格内容区域锚点
 */

interface ColRenderHocProps {
  lastArea: boolean;
  column: ColumnItem;
  children: React.ReactNode;
  area: 'header' | 'body';
}

const ContentAreaHoc = (props: ColRenderHocProps) => {
  const { lastArea, column, children } = props;
  const { prefixCls } = React.useContext(BodyContext);

  const { width, $_groupIndex } = column;

  return (
    <div
      className={classnames(
        `${prefixCls}-content-area`,
        lastArea && `${prefixCls}-last-content-area`,
      )}
      id={$_groupIndex === undefined ? undefined : `${prefixCls}-content-area-${$_groupIndex}`}
      key={$_groupIndex}
      data-style-width={width}
    >
      {children}
    </div>
  );
};

export default ContentAreaHoc;
