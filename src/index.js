/* eslint-disable import/default */

import React from "react";
import { render } from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import "react-toastify/dist/ReactToastify.min.css";

import * as persistentStorage from "core/persistent-storage";
import AppWrapper from "components/app-wrapper";
import history from "core/history";
import configureStore from "./store-config";

require("./favicon.ico"); // Tell webpack to load favicon.ico

persistentStorage.init();

let initialState = {};
const store = configureStore(initialState);

render(<AppWrapper store={store} history={history} />, document.getElementById("app"));
