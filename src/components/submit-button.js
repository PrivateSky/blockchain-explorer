import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  form: {
    marginTop: 40,
    marginBottom: 10,
    width: "78%",
    [theme.breakpoints.down("xs")]: {
      width: "84%"
    },
    marginLeft: "auto",
    marginRight: "auto",
    background: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      background: theme.palette.secondary.main
    },
    boxShadow:
      "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)"
  },
  indicator: {
    display: "inline-block",
    position: "relative",
    marginRight: 10
  }
});

const loadingIndicator = <CircularProgress size={20} left={0} top={0} style={styles.indicator} />;

const SubmitButton = ({ classes, form, requesting, label }) => {
  const loadingSection = requesting ? loadingIndicator : "";

  return (
    <Button color="primary" type="submit" className={classnames({ [classes.form]: form })} disabled={requesting}>
      {loadingSection}
      {label}
    </Button>
  );
};

SubmitButton.propTypes = {
  classes: PropTypes.object.isRequired,
  form: PropTypes.bool,
  label: PropTypes.string.isRequired,
  requesting: PropTypes.bool
};

SubmitButton.defaultProps = {
  form: true
};

export default withStyles(styles)(SubmitButton);
