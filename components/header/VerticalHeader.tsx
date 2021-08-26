import React from 'react';
import classNames from 'classnames';
import CollapsedIcon from 'raturbo-components/lib/layout/Components/CollaspedIcon';
import { HeaderProps } from './interface';

const VerticalHeader: React.FC<HeaderProps> = props => {
  const prefixCls = 'tc-header';

  const {
    fixHeader,
    verticalType,
    children,
    collapsed,
    propStyle,
    isMobile,
    hideCollapsed,
    onChangeCollapsed,
    collapseIcon,
  } = props;

  const IS_INLINE_TYPE = verticalType === 'inline';

  const CollapsedNode = (
    <CollapsedIcon onChange={onChangeCollapsed} collapsed={collapsed ?? false} />
  );

  const VerticalMenuHeaderBody = (
    <>
      {!hideCollapsed && (collapseIcon ? collapseIcon(CollapsedNode) : CollapsedNode)}
      {children}
    </>
  );

  return (
    <>
      <header
        className={classNames(
          `${prefixCls}`,
          `${prefixCls}-vertical`,
          collapsed && `${prefixCls}-collapsed`,
          isMobile && `${prefixCls}-isMobile`,
          IS_INLINE_TYPE ? `${prefixCls}-inlineLayout` : `${prefixCls}-splitLayout`,
        )}
        style={{
          opacity: !fixHeader ? 1 : 0,
          ...propStyle,
        }}
      >
        {!fixHeader && VerticalMenuHeaderBody}
      </header>
      <header
        className={classNames(
          `${prefixCls}`,
          `${prefixCls}-fixHeader`,
          `${prefixCls}-vertical`,
          collapsed && `${prefixCls}-collapsed`,
          isMobile && `${prefixCls}-isMobile`,
          IS_INLINE_TYPE ? `${prefixCls}-inlineLayout` : `${prefixCls}-splitLayout`,
        )}
        style={{
          zIndex: !fixHeader ? -1 : 4,
          opacity: !fixHeader ? 0 : 1,
          ...propStyle,
        }}
      >
        {fixHeader && VerticalMenuHeaderBody}
      </header>
    </>
  );
};

export default VerticalHeader;
