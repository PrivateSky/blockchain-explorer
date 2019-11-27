import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: theme.mixins.gutters({}),
  padded: {
    [theme.breakpoints.up(900 + theme.spacing.unit * 6)]: {
      root: {
        maxWidth: 1140
      }
    }
  }
});

function AppContent(props) {
  const { className, classes, children, fullWidth } = props;

  return <div className={classNames(classes.root, className, { [classes.padded]: !fullWidth })}>{children}</div>;
}

AppContent.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  fullWidth: PropTypes.bool
};

AppContent.defaultProps = {
  fullWidth: false
};

export default withStyles(styles)(AppContent);
