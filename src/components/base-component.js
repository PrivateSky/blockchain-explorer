import React from "react";
import PropTypes from "prop-types";
import objectAssign from "object-assign";

class BaseComponent extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = objectAssign({}, this.state, { requesting: false, requested: false });

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.componentInitialised();
  }

  componentInitialised() {}

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleCheckboxChange(name) {
    return event => {
      this.setState({ [name]: event.target.checked });
    };
  }

  static getDerivedStateFromProps({ requesting, requested }) {
    return { requesting, requested };
  }
}

BaseComponent.propTypes = {
  requesting: PropTypes.bool,
  requested: PropTypes.bool
};

BaseComponent.defaultProps = {
  requesting: false,
  requested: false
};

export default BaseComponent;
