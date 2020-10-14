import { setPublicPath } from "systemjs-webpack-interop";
setPublicPath("@se/module/{MICROAPP_NPM_PACKAGE_NAME}");

import React from "react";
const Module = React.lazy(() => import("./module"));

const routes = {
  path: "{MICROAPP_BASE_ROUTE_PATH}",
  component: Module
};

export { routes };
