import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { TcDrawerProps } from './interface';

const prefixCls = 'tc-drawer';

const Drawer: React.FC<TcDrawerProps> = props => {
  const {
    open,
    children,
    openChange,
    wrapperStyle,
    maskStyle,
    drawerStyle,
    direction,
    targetContainer,
    maskClosable,
  } = props;

  const drawerRef = useRef<any>(null);

  const prevDirection = useRef<any>();

  useEffect(() => {
    prevDirection.current = direction;
  });

  const _direction = direction || 'up';

  const prev = prevDirection.current;

  // 切换方向之后销毁dom
  if (_direction !== prev) {
    drawerRef.current = null;
  }

  useEffect(() => {
    setTimeout(() => {
      if (drawerRef.current) {
        if (open) {
          drawerRef.current.className = `${drawerRef.current.className} ${prefixCls}-opened`;
        } else {
          drawerRef.current.className = drawerRef.current.className
            .replace(`${prefixCls}-opened`, '')
            .trim();
        }
      }
    }, 10);
  }, [open]);

  let portal = null;

  const DrawerDom = (
    <div
      className={classnames(
        `${prefixCls}`,
        `${prefixCls}-direction-${_direction}`,
        targetContainer === false && `${prefixCls}-in-parent`,
      )}
      style={{ ...drawerStyle }}
      ref={drawerRef}
    >
      <div
        className={`${prefixCls}-mask`}
        style={{ ...maskStyle }}
        onClick={() => {
          maskClosable !== false && openChange && openChange(false);
        }}
      ></div>
      <div className={`${prefixCls}-wrapper`} style={{ ...wrapperStyle }}>
        {children}
      </div>
    </div>
  );

  if (drawerRef.current || open) {
    portal =
      targetContainer === false
        ? DrawerDom
        : ReactDOM.createPortal(
            DrawerDom,
            targetContainer || document.getElementsByTagName('body')[0],
          );
  }

  return portal;
};

export default Drawer;
