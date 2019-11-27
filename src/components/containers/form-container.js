import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { ValidatorForm } from "react-material-ui-form-validator";

import ResponseError from "components/response-error";

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
  form: {
    display: "flex",
    flexDirection: "column"
  },
  title: {
    color: theme.palette.primary.title,
    textAlign: "center",
    marginTop: 30,
    fontSize: 22,
    marginBottom: 10,
    letterSpacing: "normal",
    fontWeight: "bold"
  }
});

const FormContainer = ({
  classes,
  children,
  showBanner,
  beforeContent,
  afterContent,
  formProps,
  instantValidate,
  formTitle,
  showError,
  error,
  beforeError,
  afterError
}) => {
  let { className: providedClassName, ...restFormProps } = formProps;
  let formClassName = classnames(classes.form, providedClassName);

  return (
    <Paper className={classes.container}>
      {showBanner && (
        <Typography component="div" className={classes.banner}>
          PSK Explorer
        </Typography>
      )}

      {!!formTitle && (
        <Typography component="h1" className={classes.title}>
          {formTitle}
        </Typography>
      )}

      {!!beforeContent && beforeContent}

      <ValidatorForm className={formClassName} instantValidate={instantValidate} {...restFormProps}>
        {children}
      </ValidatorForm>

      {!!afterContent && afterContent}

      {!!beforeError && beforeError}

      {showError && <ResponseError response={error} />}

      {!!afterError && afterError}
    </Paper>
  );
};

FormContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  showBanner: PropTypes.bool,
  beforeContent: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  afterContent: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  formProps: PropTypes.object,
  instantValidate: PropTypes.bool,
  formTitle: PropTypes.string,
  showError: PropTypes.bool,
  error: PropTypes.object,
  beforeError: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  afterError: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

FormContainer.defaultProps = {
  showBanner: true,
  showError: true,
  formProps: {},
  instantValidate: true
};

export default withStyles(styles)(FormContainer);
