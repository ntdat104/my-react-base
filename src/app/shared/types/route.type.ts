import { RouteShape } from "@/core/types/route.type";

export interface RouteGuardShape extends RouteShape {
  config?: RouteGuardConfig;
}

export interface RouteGuardConfig {
  roles: string[];
  redirect: string;
}
