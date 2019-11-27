import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  container: {
    marginTop: 50,
    width: "50%",
    [theme.breakpoints.down(822)]: {
      width: "64%"
    },
    [theme.breakpoints.down(582)]: {
      width: "80%"
    },
    [theme.breakpoints.down(470)]: {
      width: "100%"
    },
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 20,
    paddingBottom: 20,
    boxShadow:
      "0px 1px 5px 2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)"
  },
  banner: {
    marginBottom: 20
  },
  title: {
    color: theme.palette.primary.title,
    textAlign: "center",
    marginTop: 40,
    fontSize: 22,
    marginBottom: 10,
    letterSpacing: "normal",
    fontWeight: "bold"
  }
});

const SimpleContainer = ({ classes, children, showBanner, title }) => {
  return (
    <Paper className={classes.container}>
      {showBanner && (
        <Typography component="div" className={classes.banner}>
          PSK Explorer
        </Typography>
      )}

      {!!title && (
        <Typography component="h1" className={classes.title}>
          {title}
        </Typography>
      )}
      {children}
    </Paper>
  );
};

SimpleContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  showBanner: PropTypes.bool,
  title: PropTypes.string
};

SimpleContainer.defaultProps = {
  showBanner: true
};

export default withStyles(styles)(SimpleContainer);
