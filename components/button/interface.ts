import React from 'react';

export type ButtonTypes = 'primary' | 'dashed' | 'link' | 'text' | 'default';
export type SizeTypes = 'mini' | 'small' | 'middle' | 'large';

export type ButtonHTMLTypes = 'submit' | 'button' | 'reset';

export interface ButtonProps {
  block?: Boolean;
  type?: ButtonTypes;
  size?: SizeTypes;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
  danger?: Boolean;
  htmlType?: ButtonHTMLTypes;
  href?: string;
  target?: string;
  shape?: 'circle' | 'round';
  ghost?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => void;
}

export type SizeClsProps = {
  [key in Exclude<SizeTypes, 'middle'>]: string;
};
