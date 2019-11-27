import React from "react";

import ResponseError from "components/response-error";
import Loader from "components/loader";

const withLoader = ({ showLoader, loadData, getLoaderError }) => {
  let useLoadFn = typeof loadData === "function";
  let useShowFn = typeof showLoader === "function";
  let useErrorFn = typeof getLoaderError === "function";

  return WrappedComponent => {
    return class RouteWithLoader extends React.PureComponent {
      constructor(props, context) {
        super(props, context);

        let mustShowLoader = false;
        if (useShowFn) {
          mustShowLoader = showLoader(props);
        } else if (useLoadFn) {
          mustShowLoader = true;
        }

        this.state = {
          showError: false,
          showLoader: mustShowLoader,
          error: undefined
        };

        this.mounted = false;
      }

      componentDidMount() {
        let self = this;

        this.mounted = true;

        if (useLoadFn) {
          loadData(this.props)
            .catch(error => {
              console.error(error); // eslint-disable-line no-console
              return { type: "GENERIC_ERROR", response: error };
            })
            .then(actionResponse => {
              if (!self.mounted) return;

              let error;
              let actionResponses = actionResponse instanceof Array ? actionResponse : [actionResponse];
              let isAtLeastOneErrorEncountered = actionResponses.some(({ type, response }) => {
                if (type && type.endsWith("_ERROR")) {
                  error = response;
                  console.error(response); // eslint-disable-line no-console
                  return true;
                }
              });

              if (isAtLeastOneErrorEncountered) {
                return self.setState({ showError: true, showLoader: false, error });
              }

              self.setState({ showLoader: false });
            });
        }
      }

      componentWillUnmount() {
        this.mounted = false;
      }

      static getDerivedStateFromProps(props) {
        let state = {};

        if (useShowFn) {
          state.showLoader = showLoader(props);
        }

        if (useErrorFn) {
          state.error = getLoaderError(props);
        }

        return state;
      }

      render() {
        let { showError, error, showLoader } = this.state;

        if (showError) return <ResponseError response={error || {}} />;
        if (showLoader) return <Loader />;

        return <WrappedComponent {...this.props} />;
      }
    };
  };
};

export default withLoader;
