import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";

import menuItems from "./app-menu-config";
import NavItem from "./app-drawer-nav-item";

const styles = theme => ({
  title: {
    color: "#FFF",
    marginBottom: theme.spacing.unit / 2,
    "&:hover": {
      color: grey[100]
    },
    textDecoration: "none"
  },
  // https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items
  toolbarIe11: {
    display: "flex"
  },
  toolbar: {
    ...theme.mixins.toolbar,
    paddingLeft: theme.spacing.unit * 3,
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  horizontalContainer: {
    display: "flex",
    justifyContent: "flex-start",
    "& > li": {
      width: "auto"
    }
  },
  flexAuto: {
    flex: "0 0 auto"
  },
  defaultLink: {
    color: grey[400],
    fontWeight: theme.typography.fontWeightMedium
  },
  activeLink: {
    color: "#FFF"
  }
});

function AppMenuHorizontal(props) {
  const { classes, className, onClose } = props;

  return (
    <List
      className={classnames(className, classes.nav, classes.horizontalContainer)}
      component="nav"
      subheader={
        <div className={classnames(classes.toolbarIe11, classes.flexAuto)}>
          <div className={classes.toolbar}>
            <NavLink className={classes.title} to="/" onClick={onClose}>
              <Typography variant="h6" color="inherit">
                PSK Explorer
              </Typography>
            </NavLink>
          </div>
        </div>
      }
    >
      {menuItems.map(menuItem => (
        <NavItem
          key={menuItem.to}
          onClick={onClose}
          defaultClassName={classes.defaultLink}
          activeClassName={classes.activeLink}
          {...menuItem}
        />
      ))}
    </List>
  );
}

AppMenuHorizontal.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(AppMenuHorizontal);
