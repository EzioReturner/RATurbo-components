import React from 'react';
import classNames from 'classnames';
import { SpinProps } from './interface';

const prefixCls = 'tc-spin';

const Spin: React.FC<SpinProps> = props => {
  const { spinning, fixed, propStyle, text, content, propClass } = props;

  const BarLoading = (
    <div id={`${prefixCls}-content-bar`}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );

  return (
    <div
      className={classNames(
        `${prefixCls}`,
        !spinning && `${prefixCls}-hide`,
        fixed && `${prefixCls}-fixed`,
        propClass,
      )}
      style={propStyle}
    >
      <div className={classNames(`${prefixCls}-content`)}>
        {content || BarLoading}
        <p className={`${prefixCls}-content-text`}>{text !== undefined ? text : 'LOADING...'}</p>
      </div>
    </div>
  );
};

export default Spin;
