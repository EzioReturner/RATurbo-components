export interface HeaderProps {
  fixHeader?: boolean;
  verticalType?: 'split' | 'inline';
  collapsed?: boolean;
  propStyle?: React.CSSProperties;
  isMobile?: boolean;
  hideCollapsed?: boolean;
  onChangeCollapsed?: (collapsed: boolean) => void;
  headerMode?: 'vertical' | 'horizontal';
  collapseIcon?: (originNode: React.ReactNode) => React.ReactNode;
}

export interface HorizontalHeaderProps {
  isContentFlowMode?: boolean;
}
