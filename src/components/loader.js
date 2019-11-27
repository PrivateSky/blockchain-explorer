import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import LoadingScreen from "react-loading-screen";

const styles = () => ({});

const Loader = () => {
  return (
    <LoadingScreen
      loading={true}
      bgColor="#f1f1f1"
      spinnerColor="#9ee5f8"
      textColor="#676767"
      logoSrc="/static/images/logo.png"
      text="Loading"
    >
      <div />
    </LoadingScreen>
  );
};

Loader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loader);
