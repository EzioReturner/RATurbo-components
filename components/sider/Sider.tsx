import React from 'react';
import classNames from 'classnames';
import { SidebarProps } from './interface';

const prefixCls = 'tc-sider';

const Sider: React.FC<SidebarProps> = props => {
  const { fixSider, collapsed, children, verticalType } = props;

  const IS_INLINE_TYPE = verticalType === 'inline';

  return (
    <aside
      className={classNames(
        `${prefixCls}-navigator`,
        fixSider && `${prefixCls}-navigator-fixSider`,
        collapsed && `${prefixCls}-navigator-collapsed`,
        IS_INLINE_TYPE
          ? `${prefixCls}-inlineLayout-navigator`
          : `${prefixCls}-splitLayout-navigator`,
      )}
    >
      {children}
    </aside>
  );
};

export default Sider;
