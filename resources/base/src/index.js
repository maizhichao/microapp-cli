import { setPublicPath } from "systemjs-webpack-interop";
setPublicPath("@microapp/{MICROAPP_NPM_PACKAGE_NAME}");

import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import { store } from "@/store/configure-store";
import App from "@/components/App";

ReactDOM.render(<App />, document.getElementById("root"));

export { store };
