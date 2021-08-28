import { RouteShape } from "@/core/types/route.type";
import HomePage from "./modules/home";

export const appRoutes: RouteShape[] = [
  {
    path: ["/dashboard/home"],
    component: HomePage,
    data: {},
    exact: true,
  },
];
