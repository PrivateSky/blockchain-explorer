import React from "react";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";

import connect from "core/app-connect";
import menuItems from "./app-menu-config";
import NavItem from "./app-drawer-nav-item";

const styles = theme => ({
  title: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing.unit / 2,
    "&:hover": {
      color: theme.palette.primary.main
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
  defaultLink: {
    color: grey[400],
    fontWeight: theme.typography.fontWeightMedium
  },
  activeLink: {
    color: theme.palette.primary.main
  }
});

function AppMenuVertical(props) {
  const {
    intl: { formatMessage },
    classes,
    className,
    onClose
  } = props;

  return (
    <List
      className={classnames(className, classes.nav)}
      component="nav"
      subheader={
        <div className={classnames(classes.toolbarIe11)}>
          <div className={classes.toolbar}>
            <NavLink className={classes.title} to="/" onClick={onClose}>
              <Typography variant="h5" color="inherit">
                {formatMessage({ id: "app.name" })}
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

AppMenuVertical.propTypes = {
  intl: intlShape.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

export default connect({ styles })(AppMenuVertical);
