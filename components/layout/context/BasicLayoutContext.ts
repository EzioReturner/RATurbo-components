import React from 'react';

export interface LayoutContextProps {
  prefixCls: string;
  mode: 'horizontal' | 'vertical';
}

export const DEFAULT_VALUES: LayoutContextProps = {
  prefixCls: 'tc-layout',
  mode: 'horizontal',
};

const BodyContext = React.createContext<LayoutContextProps>(DEFAULT_VALUES);

export default BodyContext;
