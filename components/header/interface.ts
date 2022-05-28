export interface HeaderProps {
  fixHeader?: boolean;
  verticalType?: 'split' | 'inline';
  collapsed?: boolean;
  propStyle?: React.CSSProperties;
  mobile?: boolean;
  hideCollapsed?: boolean;
  onChangeCollapsed?: (collapsed: boolean) => void;
  headerMode?: 'vertical' | 'horizontal';
  collapseIcon?: (originNode: React.ReactNode) => React.ReactNode;
  contentFlowMode?: boolean;
}
