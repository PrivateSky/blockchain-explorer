import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";

import Link from "./app-drawer-nav-item-link";

const styles = theme => ({
  item: {
    display: "block",
    paddingTop: 0,
    paddingBottom: 0
  },
  itemLeaf: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    justifyContent: "flex-start",
    textTransform: "none",
    width: "100%"
  },
  buttonLeaf: {
    justifyContent: "flex-start",
    textTransform: "none",
    width: "100%",
    fontWeight: theme.typography.fontWeightRegular,
    "&.depth-0": {
      fontWeight: theme.typography.fontWeightMedium
    }
  }
});

class AppDrawerNavItem extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { children, classes, depth = 0, to, onClick, labelKey, defaultClassName, activeClassName } = this.props;

    const style = {
      paddingLeft: 8 * (3 + 2 * depth)
    };

    if (to) {
      return (
        <ListItem className={classes.itemLeaf} disableGutters>
          <Button
            component={props => (
              <Link
                variant="button"
                defaultClassName={defaultClassName}
                activeClassName={activeClassName}
                to={to}
                labelKey={labelKey}
                {...props}
              />
            )}
            className={classNames(classes.buttonLeaf, `depth-${depth}`)}
            disableRipple
            onClick={onClick}
            style={style}
          >
            {""}
          </Button>
        </ListItem>
      );
    }

    return (
      <ListItem className={classes.item} disableGutters>
        <Button
          classes={{
            root: classes.button
          }}
          onClick={this.handleClick}
          style={style}
        >
          {/* {labelKey} */}
        </Button>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      </ListItem>
    );
  }
}

AppDrawerNavItem.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  depth: PropTypes.number.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
  labelKey: PropTypes.string.isRequired,
  defaultClassName: PropTypes.string.isRequired,
  activeClassName: PropTypes.string.isRequired
};

AppDrawerNavItem.defaultProps = {
  depth: 0
};

export default withStyles(styles)(AppDrawerNavItem);
