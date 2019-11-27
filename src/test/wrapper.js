import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { addLocaleData, IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import en from "react-intl/locale-data/en";
import JssProvider from "react-jss/lib/JssProvider";
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import momentUtils from "@date-io/moment";

import IntlGlobalProvider from "core/intl-global-provider";
import enMessages from "locales/en";
import themeConfig from "configs/theme";

addLocaleData([...en]);

const generateClassName = createGenerateClassName();

const Wrapper = ({ store, children }) => {
  return (
    <JssProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={createMuiTheme(themeConfig)}>
        <CssBaseline />
        <IntlProvider key="en" locale="en" messages={enMessages}>
          <MuiPickersUtilsProvider utils={momentUtils}>
            <IntlGlobalProvider>
              <MemoryRouter>
                <Provider store={store}>{children}</Provider>
              </MemoryRouter>
            </IntlGlobalProvider>
          </MuiPickersUtilsProvider>
        </IntlProvider>
      </MuiThemeProvider>
    </JssProvider>
  );
};

Wrapper.propTypes = {
  store: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default Wrapper;
