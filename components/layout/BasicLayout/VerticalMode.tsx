import React from 'react';
import classNames from 'classnames';
import LayoutHeader from '../../header';
import LayoutSidebar from '../../sider';
import { VerticalModeProps } from '../interface';
import BasicLayoutContext from '../context/BasicLayoutContext';

// 左侧导航栏模式
const VerticalMode: React.FC<VerticalModeProps> = props => {
  const { prefixCls } = React.useContext(BasicLayoutContext);

  const { hideHeader, header: _header, sider: _sider, ...rest } = props;

  const { collapsed, verticalType, mobile, fixHeader, fixSider, hideSider } = rest;

  const IS_INLINE_TYPE = verticalType === 'inline';

  const Header = !hideHeader ? (
    <LayoutHeader headerMode="vertical" {...rest}>
      {_header}
    </LayoutHeader>
  ) : null;

  const Sider = !hideSider ? <LayoutSidebar {...rest}>{_sider}</LayoutSidebar> : null;

  // 分割模式，菜单切割header
  const splitModeLayout = (
    <>
      {Sider}
      <div
        id={`${prefixCls}-mainContainer`}
        className={classNames(
          `${prefixCls}-basicLayout-wrapper`,
          collapsed && `${prefixCls}-basicLayout-wrapper-collapsed`,
        )}
      >
        {Header}
        <div className={`${prefixCls}-basicLayout-wrapper-content`}>{props.children}</div>
      </div>
    </>
  );

  // 一体布局模式，菜单不分割header
  const inlineModeLayout = (
    <>
      {Header}
      <div
        id={`${prefixCls}-mainContainer`}
        className={classNames(
          `${prefixCls}-basicLayout-wrapper`,
          collapsed && `${prefixCls}-basicLayout-wrapper-collapsed`,
        )}
      >
        {Sider}
        <div className={`${prefixCls}-basicLayout-inline-content`}>{props.children}</div>
      </div>
    </>
  );

  return (
    <div
      className={classNames(
        `${prefixCls}-basicLayout`,
        IS_INLINE_TYPE
          ? `${prefixCls}-basicLayout-inlineMode`
          : `${prefixCls}-basicLayout-splitMode`,
        hideSider && `${prefixCls}-basicLayout-hideSider`,
        hideHeader && `${prefixCls}-basicLayout-hideHeader`,
        fixHeader && `${prefixCls}-basicLayout-fixHeader`,
        fixSider && `${prefixCls}-basicLayout-fixSider`,
        mobile && `${prefixCls}-basicLayout-mobile`,
      )}
    >
      {IS_INLINE_TYPE ? inlineModeLayout : splitModeLayout}
    </div>
  );
};

export default VerticalMode;
