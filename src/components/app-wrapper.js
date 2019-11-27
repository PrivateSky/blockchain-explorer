import React, { Component } from "react";
import PropTypes from "prop-types";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from "@material-ui/core";
import { addLocaleData, IntlProvider } from "react-intl";
import JssProvider from "react-jss/lib/JssProvider";
import { hot } from "react-hot-loader/root";
import en from "react-intl/locale-data/en";
import { ValidatorForm } from "react-material-ui-form-validator";
import { ToastContainer } from "react-toastify";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import momentUtils from "@date-io/moment";

import IntlGlobalProvider from "core/intl-global-provider";
import AppFrame from "./app-frame";
import RoutesSwitch from "./routes-switch";
import enMessages from "locales/en";
import themeConfig from "configs/theme";
import { validationRules } from "utils/validation-utils";

addLocaleData([...en]);

validationRules.forEach(({ name, validate }) => {
  ValidatorForm.addValidationRule(name, validate);
});

const generateClassName = createGenerateClassName();

class AppWrapper extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={createMuiTheme(themeConfig)}>
          <CssBaseline />
          <IntlProvider key="en" locale="en" messages={enMessages}>
            <MuiPickersUtilsProvider utils={momentUtils}>
              <IntlGlobalProvider>
                <Provider store={store}>
                  <ConnectedRouter history={history}>
                    <AppFrame store={store}>
                      <RoutesSwitch />
                      <ToastContainer autoClose={8000} />
                    </AppFrame>
                  </ConnectedRouter>
                </Provider>
              </IntlGlobalProvider>
            </MuiPickersUtilsProvider>
          </IntlProvider>
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

AppWrapper.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default hot(AppWrapper);
