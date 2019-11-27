import React, { Component } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

class ScrollRoute extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.path === this.props.location.pathname &&
      this.props.location.pathname !== prevProps.location.pathname
    ) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { component: Component, ...rest } = this.props;

    return <Route {...rest} render={props => <Component {...props} />} />;
  }
}

ScrollRoute.propTypes = {
  component: PropTypes.any,
  path: PropTypes.string,
  location: PropTypes.object
};

export default ScrollRoute;
