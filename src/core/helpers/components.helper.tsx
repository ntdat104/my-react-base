import React from "react";
import { Redirect, Route } from "react-router";
import { RouteShape } from "../types/route.type";

const groupRoutes = (
  routes: RouteShape[] = [],
  isStrict = false,
): React.ReactNode[] => {
  return routes.map((route, i) => {
    const Component = route.component as React.ComponentType<any>;
    return (
      <Route
        key={i}
        path={route.path}
        exact={route.exact}
        render={(props) => {
          if (!isStrict || route.guardResult?.isAllow) {
            return <Component {...props} {...route.data} />;
          }

          return <Redirect to={route.guardResult?.redirect || ""} />;
        }}
      />
    );
  });
};

export { groupRoutes };
