export interface SpinProps {
  spinning: boolean;
  fixed?: boolean;
  propClass?: string;
  propStyle?: React.CSSProperties;
  text?: string | number | React.ReactNode;
  content?: React.ReactNode;
}
