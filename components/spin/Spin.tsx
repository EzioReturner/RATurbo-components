import React from 'react';
import classNames from 'classnames';
import { SpinProps } from './interface';

const prefixCls = 'tc-spin';

const Spin: React.FC<SpinProps> = props => {
  const { spinning, fixed, propStyle, text, content, propClass } = props;

  const CycleLoading = <div id={`${prefixCls}-content-circle`} />;

  const AngleLoading = (
    <div id={`${prefixCls}-content-angle`}>
      <span className="angle-border border-1"></span>
      <span className="angle-border border-2"></span>
      <span className="angle-border border-3"></span>
      <div className="angle-content">
        <div className="angle-content-bg"></div>
      </div>
    </div>
  );

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
