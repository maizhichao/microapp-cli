import { setPublicPath } from "systemjs-webpack-interop";
setPublicPath("@microapp/base");

import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "@/components/App";

ReactDOM.render(<App />, document.getElementById("root"));
