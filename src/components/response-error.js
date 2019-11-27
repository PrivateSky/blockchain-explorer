import React from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";

const styles = {
  format: {
    margin: "4px",
    marginLeft: "auto",
    marginRight: "auto",
    color: "red",
    paddingBottom: 10,
    textAlign: "center"
  }
};

const ResponseError = ({ intl: { formatMessage }, response }) => {
  if (!response) return null;

  const errorMessageCode = response && response.error && response.error.code ? response.error.code : "defaultError";

  return <p style={styles.format}>{formatMessage({ id: `errors.${errorMessageCode}` })}</p>;
};

ResponseError.propTypes = {
  intl: intlShape.isRequired,
  response: PropTypes.object
};

export default injectIntl(ResponseError);
