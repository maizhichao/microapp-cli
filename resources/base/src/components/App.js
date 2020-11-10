import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store/configure-store";
import { Router } from "react-router-dom";
import { history } from "@/router";
import AppHeader from "./Header";
import Main from "@/components/Main";
import { Layout } from "antd";

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Layout className="se-app">
          <AppHeader />
          <Main />
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
