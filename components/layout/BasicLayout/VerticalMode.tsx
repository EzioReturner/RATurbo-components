import React from 'react';
import classNames from 'classnames';
import LayoutHeader from 'raturbo-components/lib/header/VerticalHeader';
import LayoutSidebar from 'raturbo-components/lib/sider';
import { VerticalModeProps } from '../interface';
import BasicLayoutContext from '../context/BasicLayoutContext';
import 'raturbo-components/lib/sider/style';
import 'raturbo-components/lib/header/style';

// 左侧导航栏模式
const VerticalMode: React.FC<VerticalModeProps> = props => {
  const { prefixCls } = React.useContext(BasicLayoutContext);

  const { hideHeader, header: _header, sider: _sider, ...rest } = props;

  const { collapsed, verticalType, isMobile, fixHeader, fixSider, hideSider } = rest;

  const IS_INLINE_TYPE = verticalType === 'inline';

  const Header = !hideHeader ? <LayoutHeader {...rest}>{_header}</LayoutHeader> : null;

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
        <div className={`${prefixCls}-basicLayout-wrapper-content`}>
          {props.children}
          {/* {copyright && <Footer propStyle={{ margin: '16px 0' }} />} */}
        </div>
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
        {props.children}
      </div>
      {/* <div
        className={classNames(
          `${prefixCls}-basicLayout-inlineMode-footer`,
          // isDarkTheme && `${prefixCls}-basicLayout-inlineMode-footer-dark`
        )}
      >
        {!hideSider && (
          <div
            className={classNames(
              `${prefixCls}-basicLayout-inlineMode-footer-icon`,
              collapsed && `${prefixCls}-basicLayout-inlineMode-footer-collapsed`,
            )}
            // onClick={() => toggleCollapsed()}
          >
            {IconCollapsed}
          </div>
        )}
        {copyright && <Footer propStyle={{ alignSelf: 'flex-end' }} />}
      </div> */}
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
        isMobile && `${prefixCls}-basicLayout-mobile`,
      )}
    >
      {IS_INLINE_TYPE ? inlineModeLayout : splitModeLayout}
    </div>
  );
};

export default VerticalMode;
