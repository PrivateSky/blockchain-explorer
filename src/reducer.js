import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import history from "core/history";
import navigation from "components/hoc/navigation/navigation-reducer";
import appFrame from "components/app-frame/app-frame-reducer";
import currentVersion from "features/current-version-page/current-version-reducer";
import transactionsLog from "features/transactions-log-page/transactions-log-reducer";

const rootReducer = combineReducers({
  router: connectRouter(history),
  navigation,
  appFrame,
  currentVersion,
  transactionsLog
});

export default rootReducer;
