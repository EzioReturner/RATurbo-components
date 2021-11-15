import React from 'react';
import classNames from 'classnames';
import LayoutHeader from '../../header';
import BasicLayoutContext from '../context/BasicLayoutContext';
import { HorizontalModeProps } from '../interface';

// 顶部导航栏模式
const HorizontalMode: React.FC<HorizontalModeProps> = props => {
  const { hideHeader, fixHeader, isContentFlowMode, header: _header } = props;

  const { prefixCls } = React.useContext(BasicLayoutContext);

  return (
    <div
      id={`${prefixCls}-mainContainer`}
      className={classNames(
        `${prefixCls}-basicLayout-horizontal`,
        hideHeader && `${prefixCls}-basicLayout-horizontal-hideHeader`,
        isContentFlowMode && `${prefixCls}-basicLayout-horizontal-contentFlow`,
        fixHeader && `${prefixCls}-basicLayout-horizontal-fixHeader`,
      )}
    >
      {!hideHeader && <LayoutHeader headerMode="horizontal">{_header}</LayoutHeader>}
      <div className={`${prefixCls}-basicLayout-horizontal-wrapper`}>{props.children}</div>
    </div>
  );
};

export default HorizontalMode;
