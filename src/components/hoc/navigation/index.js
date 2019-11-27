import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { NAVIGATED } from "constants/action-types";

export const withNavigation = ({ titleKey, actionType, fullWidth, didMount }) => {
  return WrappedComponent => {
    class Navigation extends React.Component {
      componentDidMount() {
        if (titleKey) {
          this.props.navigate(titleKey);
        }

        if (actionType) {
          this.props.mount(`${actionType}_MOUNTED`);
          didMount && didMount(this.props);
        }
      }

      componentWillUnmount() {
        if (actionType) {
          this.props.unmount(`${actionType}_UNMOUNTED`);
        }
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    Navigation.propTypes = {
      navigate: PropTypes.func.isRequired,
      mount: PropTypes.func.isRequired,
      unmount: PropTypes.func.isRequired
    };

    function mapDispatchToProps(dispatch) {
      return {
        navigate: titleKey => dispatch({ type: NAVIGATED, titleKey, fullWidth }),
        mount: type => dispatch({ type }),
        unmount: type => dispatch({ type })
      };
    }

    return connect(
      null,
      mapDispatchToProps
    )(Navigation);
  };
};
