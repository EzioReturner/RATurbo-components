import React from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import {
  RouteMiddleProps,
  RouteMiddleRouteProps,
  RouterRenderProps,
  RouteProps,
} from './interface';

const RouterRender: React.FC<RouterRenderProps> = props => {
  const { routeConfig, exception, nodeContainer } = props;

  const RouteMiddle = (rmProps: RouteMiddleProps) => {
    const { location } = rmProps as RouteMiddleRouteProps;
    const { path, exact, strict, render, ...rest } = rmProps;
    return (
      <Route
        path={path}
        exact={exact}
        strict={strict}
        location={location}
        render={_props => render({ ..._props, ...rest })}
      />
    );
  };
  const generateRoute = (routes?: RouteProps[], switchProps?: any) =>
    (routes ? (
      <Switch {...switchProps}>
        {routes.map((route, i: number) => {
          const {
            redirect,
            path,
            exact,
            strict,
            routes: child,
            component,
            key,
            // withAuthority,
            // authority,
            // name
          } = route;

          if (redirect) {
            return (
              <Redirect key={key || i} from={path} to={redirect} exact={exact} strict={strict} />
            );
          }
          return (
            <RouteMiddle
              key={i}
              path={path}
              exact={exact}
              strict={strict}
              render={(_props: any) => {
                const childRoutes = generateRoute(child, {
                  location: _props.location,
                });

                if (component) {
                  const C = component;

                  return nodeContainer ? (
                    nodeContainer({ component, route }, childRoutes)
                  ) : typeof component !== 'string' ? (
                    // @ts-ignore
                    <C {...{ route }}>{childRoutes}</C>
                  ) : (
                    C
                  );
                }
                return childRoutes;
              }}
            />
          );
        })}
        <Route component={exception} />
      </Switch>
    ) : null);

  return <Router>{generateRoute(routeConfig)}</Router>;
};

export default RouterRender;
