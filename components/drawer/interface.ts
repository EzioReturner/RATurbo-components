export interface TcDrawerProps {
  open: boolean;
  openChange?: (open: boolean) => void;
  direction?: 'up' | 'left' | 'down' | 'right';
  wrapperStyle?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
  drawerStyle?: React.CSSProperties;
  targetContainer?: any;
  maskClosable?: boolean;
}
