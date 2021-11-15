export interface LayoutProps {
  header?: React.ReactNode;
  // siteLogo?: React.ReactNode;
  hideHeader?: boolean; // 显示header
  fixHeader?: boolean; // 固定header
  isMobile?: boolean;
}

export interface HeaderProps {
  fixHeader?: boolean;
}

export interface BasicLayoutProps extends LayoutProps {
  mode?: 'vertical' | 'horizontal'; // 启用水平导航模式
}

export interface HorizontalModeProps extends BasicLayoutProps {
  isContentFlowMode?: boolean; // 内容区域流式布局
}

export interface VerticalModeProps extends BasicLayoutProps {
  verticalType?: 'split' | 'inline';
  collapsed?: boolean;
  onChangeCollapsed?: (collapsed: boolean) => void;
  hideSider?: boolean;
  fixSider?: boolean;
  sider?: React.ReactNode;
  collapseIcon?: (originNode: React.ReactNode) => React.ReactNode;
}

export interface SiteDetailProps {
  menuLinkUrl?: string;
  sitIcon?: React.ReactNode | string;
  siteName?: React.ReactNode | string;
}
