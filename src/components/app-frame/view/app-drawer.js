import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Hidden from "@material-ui/core/Hidden";

import AppMenu from "./app-menu";

const styles = theme => ({
  paper: {
    width: 250,
    backgroundColor: theme.palette.background.paper
  }
});

// iOS is hosted on high-end devices. We can enable the backdrop transition without
// dropping frames. The performance will be good enough.
// iOS has a "swipe to go back" feature that mess with the discovery feature.
// We have to disable it.
// So: <SwipeableDrawer disableBackdropTransition={false} disableDiscovery={true} />
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

function AppDrawer(props) {
  const { classes, className, disablePermanent, mobileOpen, onClose, onOpen } = props;

  const drawer = <AppMenu vertical onClose={onClose} />;

  return (
    <div className={className}>
      <Hidden lgUp={!disablePermanent}>
        <SwipeableDrawer
          classes={{
            paper: classNames(classes.paper, "algolia-drawer")
          }}
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          variant="temporary"
          open={mobileOpen}
          onOpen={onOpen}
          onClose={onClose}
          ModalProps={{
            keepMounted: true
          }}
        >
          {drawer}
        </SwipeableDrawer>
      </Hidden>
      {disablePermanent ? null : (
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.paper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      )}
    </div>
  );
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  disablePermanent: PropTypes.bool,
  mobileOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired
};

AppDrawer.defaultProps = {
  disablePermanent: false
};

export default withStyles(styles)(AppDrawer);
