import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { intlShape } from "react-intl";
import classnames from "classnames";
import Typography from "@material-ui/core/Typography";

import connect from "core/app-connect";

const styles = theme => ({
  root: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  default: {
    color: "inherit"
  },
  white: {
    color: "#FFF"
  },
  primary: {
    color: theme.palette.primary.main
  },
  secondary: {
    color: theme.palette.secondary.main
  },
  button: {
    "&:hover": {
      textDecoration: "inherit"
    }
  }
});

function Link(props) {
  const {
    intl: { formatMessage },
    classes,
    to,
    onClick,
    labelKey,
    style,
    defaultClassName,
    activeClassName
  } = props;

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={classnames(classes.root, defaultClassName)}
      activeClassName={activeClassName}
      style={style}
    >
      <Typography variant="h6" color="inherit">
        {formatMessage({ id: labelKey })}
      </Typography>
    </NavLink>
  );
}

Link.defaultProps = {
  variant: "default",
  activeClassName: "active"
};

Link.propTypes = {
  intl: intlShape.isRequired,
  defaultClassName: PropTypes.string,
  activeClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  labelKey: PropTypes.string.isRequired,
  className: PropTypes.string,
  component: PropTypes.any,
  to: PropTypes.string,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
  style: PropTypes.object,
  variant: PropTypes.oneOf(["default", "primary", "secondary", "button"])
};

export default connect({ styles })(Link);
