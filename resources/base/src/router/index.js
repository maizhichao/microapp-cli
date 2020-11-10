import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PageNotFound from "@/common/components/PageNotFound";
import { Skeleton, Spin } from "antd";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const Loading = () => <Spin delay={100} tip="Loading" />;

const EmptyMicroApp = name => {
  const MicroApp = () => {
    return (
      <>
        <h2>{name}</h2>
        <Skeleton active={true} />
      </>
    );
  };
  MicroApp.displayName = name;
  return MicroApp;
};

function Router() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route
          exact
          path="/microapp1"
          component={EmptyMicroApp("Micro App 1")}
        />
        <Route
          exact
          path="/microapp2"
          component={EmptyMicroApp("Micro App 2")}
        />
        <Route
          exact
          path="/microapp3"
          component={EmptyMicroApp("Micro App 3")}
        />
        <Route
          exact
          path="/nested-menu/nested1"
          component={EmptyMicroApp("Nested 1")}
        />
        <Route
          exact
          path="/nested-menu/nested2"
          component={EmptyMicroApp("Nested 2")}
        />
        <Redirect exact from="/" to="/microapp1" />
        <Route component={PageNotFound} />
      </Switch>
    </Suspense>
  );
}

export default React.memo(Router);
