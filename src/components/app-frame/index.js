import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import connect from "core/app-connect";
import { APP_FRAME } from "constants/action-types";
import * as actions from "./app-frame-actions";
import AppFrameView from "./view";

const AppFrame = ({ actions, ...rest }) => {
  return <AppFrameView {...actions} {...rest} />;
};

AppFrame.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps({ navigation: { titleKey = "header.defaultTitle", fullWidth } }) {
  return {
    titleKey,
    fullWidth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default withRouter(
  connect({
    mapStateToProps,
    mapDispatchToProps,
    actionType: APP_FRAME,
    pure: false
  })(AppFrame)
);
