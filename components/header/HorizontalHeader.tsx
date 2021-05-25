import React from 'react';
import classNames from 'classnames';
import { HorizontalHeaderProps } from './interface';

const HorizontalHeader: React.FC<HorizontalHeaderProps> = props => {
  const prefixCls = 'tc-header';

  const { isContentFlowMode, children } = props;

  return (
    <header className={classNames(`${prefixCls}`, `${prefixCls}-horizontal`)}>
      <div
        className={classNames(
          `${prefixCls}-container`,
          isContentFlowMode && `${prefixCls}-container-flowMode`,
        )}
      >
        <div className={`${prefixCls}-headerNav`}>{children}</div>
      </div>
    </header>
  );
};

export default HorizontalHeader;
