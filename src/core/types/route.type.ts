import React from "react";

export interface RouteShape {
  path: string | string[];
  exact?: boolean;
  component: React.ComponentType;
  data?: {
    [key: string]: any;
  };
  guardResult?: RouteGuardResult;
}

export interface RouteGuardResult {
  isAllow?: boolean;
  redirect?: string;
}
