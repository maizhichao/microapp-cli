import { setPublicPath } from "systemjs-webpack-interop";
setPublicPath("@microapp/{MICROAPP_NPM_PACKAGE_NAME}");

import Module from "./module";
export default Module;
