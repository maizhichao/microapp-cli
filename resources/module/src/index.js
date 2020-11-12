import { setPublicPath } from "systemjs-webpack-interop";
setPublicPath("@microapp/{MICROAPP_NPM_PACKAGE_NAME}");

import React from "react";
export default React.lazy(() => import("./module"));
