import React from 'react';
import classNames from 'classnames';
import { HeaderProps } from './interface';

const HorizontalHeader: React.FC<HeaderProps> = props => {
  const prefixCls = 'tc-header';

  const { contentFlowMode, children, fixHeader } = props;

  return (
    <header
      className={classNames(
        `${prefixCls}`,
        `${prefixCls}-horizontal`,
        fixHeader && `${prefixCls}-fixHeder`,
      )}
    >
      <div
        className={classNames(
          `${prefixCls}-container`,
          contentFlowMode && `${prefixCls}-container-flowMode`,
        )}
      >
        <div className={`${prefixCls}-headerNav`}>{children}</div>
      </div>
    </header>
  );
};

export default HorizontalHeader;
