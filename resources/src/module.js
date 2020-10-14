import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./components/main";
import configStore from "./configure-store";
const store = configStore();
import { Provider } from "react-redux";

function Module(props) {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
export default Module;
