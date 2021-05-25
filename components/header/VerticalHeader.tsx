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
  } = props;

  const IS_INLINE_TYPE = verticalType === 'inline';

  const VerticalMenuHeaderBody = (
    <>
      {/* {isInlineLayout && (_siteLogo || <SiteDetail />)}
      {showSiderBar && !isInlineLayout && IconCollapsed} */}
      {!hideCollapsed && (
        <CollapsedIcon onChange={onChangeCollapsed} collapsed={collapsed ?? false} />
      )}
      {children}
      {/* <div className={`${prefixCls}-rightPlace`}>
        <UserInfo />
        {usei18n && <SelectLang />}
      </div> */}
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
          // !showSiderBar && `${prefixCls}-withoutMenu`,
          IS_INLINE_TYPE ? `${prefixCls}-inlineLayout` : `${prefixCls}-splitLayout`,
          // isDarkTheme && `${prefixCls}-darkTheme`
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
          // !showSiderBar && `${prefixCls}-withoutMenu`,
          IS_INLINE_TYPE ? `${prefixCls}-inlineLayout` : `${prefixCls}-splitLayout`,
          // isDarkTheme && `${prefixCls}-darkTheme`
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
