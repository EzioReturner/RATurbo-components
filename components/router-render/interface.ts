import { RouteComponentProps } from 'react-router-dom';
/**
 * 路由生成组件
 * 遍历路由表 生成多级路由
 */
export interface RouteMiddleProps {
  path?: string;
  exact?: boolean;
  strict?: boolean;
  render: Function;
  key: string | number;
}

export interface RouteMiddleRouteProps extends RouteMiddleProps, RouteComponentProps {}

export interface RouterRenderProps<T extends RouteProps = RouteProps> {
  routeConfig: Array<T>;
  exception?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  nodeContainer?: (
    data: { component: React.ReactNode; route: T },
    children: JSX.Element | null,
  ) => React.ReactNode;
}

export interface RouteProps {
  path: string;
  component?:
    | string
    | React.ReactNode
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  routes?: RouteProps[];
  redirect?: string;
  exact?: boolean;
  strict?: boolean;
  key?: string | number;
  extraInfo?: any;
}
