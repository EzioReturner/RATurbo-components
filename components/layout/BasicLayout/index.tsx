import React from 'react';
import HorizontalMode from './HorizontalMode';
import VerticalMode from './VerticalMode';
import { VerticalModeProps, HorizontalModeProps } from '../interface';
import BasicLayoutContext, { DEFAULT_VALUES } from '../context/BasicLayoutContext';

const BasicLayout: React.FC<VerticalModeProps & HorizontalModeProps> = props => {
  const { mode, ...rest } = props;

  const layoutMode = mode || 'vertical';

  const BasicLayoutContextValues = React.useMemo(
    () => ({
      ...DEFAULT_VALUES,
      mode: layoutMode,
    }),
    [],
  );

  return (
    <BasicLayoutContext.Provider value={BasicLayoutContextValues}>
      {layoutMode === 'vertical' ? <VerticalMode {...rest} /> : <HorizontalMode {...rest} />}
    </BasicLayoutContext.Provider>
  );
};

export default BasicLayout;
