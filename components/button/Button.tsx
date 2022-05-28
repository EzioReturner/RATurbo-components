import React from 'react';
import classNames from 'classnames';
import { ButtonProps, SizeClsProps } from './interface';

import IconLoading from './IconLoading';

const prefixCls = 'tc-button';

const sizeCls: SizeClsProps = {
  mini: 'mi',
  small: 'sm',
  large: 'lg',
};

const getBtnClassNames = (props: ButtonProps) => {
  const { className, type, size, danger, shape, ghost, disabled, loading, block } = props;

  const baseClassNames = [
    prefixCls,
    type && `${prefixCls}-${type}`,
    shape && `${prefixCls}-${shape}`,
    ghost && `${prefixCls}-ghost`,
    danger && `${prefixCls}-dangerous`,
    disabled && `${prefixCls}-disabled`,
    loading && `${prefixCls}-loading`,
    block && `${prefixCls}-block`,
  ];

  const sizeClassName = size && size !== 'middle' && `${prefixCls}-${sizeCls[size]}`;

  return classNames(...[baseClassNames, sizeClassName, className]);
};

const Icon: React.FC<ButtonProps> = props => {
  if (!props.icon && !props.loading) return <></>;
  return (
    <span className={`${prefixCls}-icon--box`}>{props.loading ? <IconLoading /> : props.icon}</span>
  );
};

const Button: React.FC<ButtonProps> = props => {
  const btnClassNames = getBtnClassNames(props);

  const handleClick: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>,
  ) => void = e => {
    if (props.disabled || !props.onClick) return;
    props.onClick(e);
  };

  if (props.type === 'link' && props.href) {
    return (
      <a className={btnClassNames} href={props.href} target={props.target} onClick={handleClick}>
        <Icon {...props} />
        {props.children && <span>{props.children}</span>}
      </a>
    );
  }

  const { htmlType = 'button' as ButtonProps['htmlType'] } = props;

  return (
    // eslint-disable-next-line react/button-has-type
    <button className={btnClassNames} type={htmlType} onClick={handleClick}>
      <Icon {...props} />
      {props.children && <span>{props.children}</span>}
    </button>
  );
};

export default Button;
