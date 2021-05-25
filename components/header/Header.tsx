import React from 'react';
import VerticalHeader from './VerticalHeader';
import HorizontalHeader from './HorizontalHeader';
import { HeaderProps } from './interface';

const Header: React.FC<HeaderProps> = props => {
  const { headerMode, ...rest } = props;

  return (
    <>{headerMode === 'vertical' ? <VerticalHeader {...rest} /> : <HorizontalHeader {...rest} />}</>
  );
};

export default Header;
