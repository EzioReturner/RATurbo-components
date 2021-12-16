import React from 'react';
import BodyContext from '../context/BodyContext';

/**
 * @name 表格，表头组合header-HOC
 */

const GroupHeaderHoc: React.FC<{ colData: StoreKeyValue }> = props => {
  const { colData } = props;
  const { customGroupHeader, prefixCls } = React.useContext(BodyContext);

  const node = (nodeTitle?: React.ReactNode) => (
    <div
      className={`${prefixCls}-data-cell ${prefixCls}-header-cell ${prefixCls}-group-header-cell`}
    >
      <span
        style={{
          width: '100%',
          textAlign: colData.align,
          display: 'inline-block',
        }}
      >
        {nodeTitle || colData.title}
      </span>
    </div>
  );

  return (
    (customGroupHeader &&
      customGroupHeader(colData, (nodeTitle?: React.ReactNode) => node(nodeTitle))) ||
    node()
  );
};

export default GroupHeaderHoc;
