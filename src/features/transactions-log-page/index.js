import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

import connect from "core/app-connect";
import { TRANSACTIONS_LOG_PAGE } from "constants/action-types";
import * as actions from "./transactions-log-actions";
import TransactionsLogView from "./view";

export const TransactionsLogPage = ({ actions, ...rest }) => {
  return <TransactionsLogView {...actions} {...rest} />;
};

TransactionsLogPage.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps({ transactionsLog: { requesting, requested, data, latestTransaction, error } = {} }) {
  return {
    requesting,
    requested,
    data,
    latestTransaction,
    error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect({
  mapStateToProps,
  mapDispatchToProps,
  titleKey: "transactionsLog.title",
  actionType: TRANSACTIONS_LOG_PAGE,
  loadData: ({ actions: { doLoadTransactionsLogData } }) => {
    return doLoadTransactionsLogData();
  }
})(TransactionsLogPage);
