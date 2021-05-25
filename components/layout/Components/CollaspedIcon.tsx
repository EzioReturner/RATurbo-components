import React from 'react';
import ChevronsLeft from 'react-feather/dist/icons/chevrons-left';
import classnames from 'classnames';

interface CollapsedIconProps {
  collapsed: boolean;
  onChange?: (collapsed: boolean) => void;
}

const CollapsedIcon: React.FC<CollapsedIconProps> = props => {
  const { collapsed, onChange } = props;

  return (
    <ChevronsLeft
      onClick={() => onChange && onChange(!collapsed)}
      className={classnames('collapsed-icon', collapsed && 'collapsed-icon-active')}
    />
  );
};

export default CollapsedIcon;
