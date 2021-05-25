export interface HeaderProps {
  fixHeader?: boolean;
  verticalType?: 'split' | 'inline';
  collapsed?: boolean;
  propStyle?: React.CSSProperties;
  isMobile?: boolean;
  hideCollapsed?: boolean;
  onChangeCollapsed?: (collapsed: boolean) => void;
  headerMode?: 'vertical' | 'horizontal';
}

export interface HorizontalHeaderProps {
  isContentFlowMode?: boolean;
}
