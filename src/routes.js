import React from "react";

import NotFoundPage from "components/404Page";
import RenderRoutes from "components/renderRoutes";

const LoginComponent = React.lazy(() => import("pages/login"));
const SignupComponent = React.lazy(() => import("pages/register"));

const ApplicationComponent = React.lazy(() => import("pages/application"));
const ApplicationDetailComponent = React.lazy(() =>
  import("pages/application/detail")
);

export const INDEX_ROUTE = "/";
export const SIGNUP_ROUTE = "/signup/";

export const APPLICATION_DETAIL_ROUTE = "/:applicationId/";

export const getApplicationDetailRoute = (applicationId) => {
  return APPLICATION_DETAIL_ROUTE.replace(":applicationId", applicationId);
};

export const NON_LOGIN_ROUTES = [
  {
    path: "/",
    name: "index",
    component: RenderRoutes,
    routes: [
      {
        exact: true,
        name: "login",
        path: INDEX_ROUTE,
        component: LoginComponent,
      },
      {
        exact: true,
        name: "register",
        path: SIGNUP_ROUTE,
        component: SignupComponent,
      },
    ],
  },
];

export const LOGGED_IN_ROUTES = [
  {
    path: "/",
    name: "index",
    component: RenderRoutes,
    routes: [
      {
        exact: true,
        name: "application",
        path: INDEX_ROUTE,
        component: ApplicationComponent,
      },
      {
        exact: true,
        name: "application-detail",
        path: APPLICATION_DETAIL_ROUTE,
        component: ApplicationDetailComponent,
      },
    ],
  },
  {
    component: NotFoundPage,
  },
];
