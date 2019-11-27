import React, { Component } from "react";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";
import classnames from "classnames";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import connect from "core/app-connect";
import AppDrawer from "./app-drawer";
import AppContent from "./app-content";
import AppMenu from "./app-menu";

const styles = theme => ({
  container: {
    display: "flex",
    alignItems: "stretch",
    minHeight: "100vh",
    width: "100%"
  },
  grow: {
    flex: "1 1 auto"
  },
  title: {
    marginLeft: 24,
    flex: "0 1 auto"
  },
  relative: {
    position: "relative"
  },
  appBar: {
    transition: theme.transitions.create("width"),
    "@media print": {
      position: "absolute"
    }
  },
  appBarHome: {
    boxShadow: "none"
  },
  appBarShift: {
    [theme.breakpoints.up("lg")]: {
      // width: "calc(100% - 250px)"
    }
  },
  drawer: {
    [theme.breakpoints.up("lg")]: {
      width: 250
    }
  },
  hideOnSmall: {
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
  },
  showOnSmall: {
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  rightSideContainer: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    height: "100vh"
  },
  appContent: {
    overflow: "hidden",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    position: "relative"
  }
});

class AppFrame extends Component {
  state = {
    mobileOpen: false
  };

  handleDrawerOpen = () => {
    this.setState({ mobileOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ mobileOpen: false });
  };

  render() {
    const {
      intl: { formatMessage },
      classes,
      children,
      titleKey,
      fullWidth
    } = this.props;

    const title = formatMessage({ id: titleKey });

    return (
      <div className={classes.container}>
        <div>
          <AppDrawer
            className={classnames(classes.drawer, classes.hideOnSmall)}
            onClose={this.handleDrawerClose}
            onOpen={this.handleDrawerOpen}
            mobileOpen={this.state.mobileOpen}
          />
        </div>
        <div className={classes.rightSideContainer}>
          <div className={classes.appBarContainer}>
            <AppBar className={classnames(classes.relative, classes.showOnSmall)}>
              <AppMenu onClose={this.handleDrawerClose} />
            </AppBar>

            <AppBar className={classnames(classes.relative, classes.appBar, classes.hideOnSmall, classes.appBarShift)}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classes.hideOnSmall}
                >
                  <MenuIcon />
                </IconButton>
                {title !== null && (
                  <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                    {title}
                  </Typography>
                )}
                <div className={classes.grow} />
                {/* <AppSearch /> */}
              </Toolbar>
            </AppBar>
          </div>
          {/* <Notifications /> */}
          {/* <AppDrawer
            className={classes.drawer}
            onClose={this.handleDrawerClose}
            onOpen={this.handleDrawerOpen}
            mobileOpen={this.state.mobileOpen}
          /> */}

          <AppContent className={classnames(classes.appContent, classes.grow)} fullWidth={fullWidth}>
            {children}
          </AppContent>
        </div>
      </div>
    );
  }
}

AppFrame.propTypes = {
  intl: intlShape.isRequired,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  titleKey: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool
};

export default connect({ styles, pure: false })(AppFrame);
