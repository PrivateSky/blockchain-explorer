import React from "react";
import { Switch } from "react-router-dom";

import configuredRoutes from "configs/routes";
import NotFoundPage from "features/not-found-page";
import ScrollRoute from "./scroll-route";

// needs to stay outside of the render method since it will case multiple unmounts of the components
const routes = configuredRoutes.map(route => {
  return <ScrollRoute exact={route.exact} key={route.path} path={route.path} component={route.component} />;
});

const RoutesSwitch = () => {
  return (
    <Switch>
      {routes}
      <ScrollRoute component={NotFoundPage} />
    </Switch>
  );
};

export default RoutesSwitch;
