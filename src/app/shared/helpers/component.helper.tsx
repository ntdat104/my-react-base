import {
  RouteGuardConfig,
  RouteGuardShape,
} from "@/app/shared/types/route.type";
import { RouteShape } from "@/core/types/route.type";
import { groupRoutes } from "@/core/helpers/components.helper";

const guardRoutes = (
  routes: RouteGuardShape[],
  role: string,
  config?: RouteGuardConfig,
): React.ReactNode[] => {
  const guardedRoutes: RouteShape[] = routes.map((route) => {
    let isAllow = true;
    let redirect = "";
    if (config) {
      isAllow = config.roles.includes(role);
      redirect = config.redirect;
    }
    if (route.config) {
      isAllow = route.config.roles.includes(role);
      redirect = route.config.redirect;
    }

    return {
      ...route,
      guardResult: {
        isAllow,
        redirect,
      },
    };
  });

  return groupRoutes(guardedRoutes, true);
};

export { guardRoutes };
