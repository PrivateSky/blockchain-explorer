import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import AppMenuVertical from "./app-menu-vertical";
import AppMenuHorizontal from "./app-menu-horizontal";

const AppMenu = ({ vertical, ...rest }) => {
  if (vertical) return <AppMenuVertical {...rest} />;
  return <AppMenuHorizontal {...rest} />;
};

AppMenu.propTypes = {
  vertical: PropTypes.bool
};

AppMenu.defaultProps = {
  vertical: false
};

export default withRouter(AppMenu);
