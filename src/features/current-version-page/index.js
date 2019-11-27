import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

import connect from "core/app-connect";
import { CURRENT_VERSION_PAGE } from "constants/action-types";
import * as currentVersionActions from "./current-version-actions";
import * as transactionsLogActions from "../transactions-log-page/transactions-log-actions";
import CurrentVersionView from "./view";

export const CurrentVersionPage = ({ actions, ...rest }) => {
  let {
    match: {
      params: { assetType, assetId, txId }
    }
  } = rest;

  return <CurrentVersionView {...actions} {...rest} assetType={assetType} assetId={assetId} txId={txId} />;
};

CurrentVersionPage.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps({
  currentVersion: { requesting, requested, data, error } = {},
  transactionsLog: {
    requesting: transactionsRequesting,
    requested: transactionsRequested,
    data: transactionsData,
    error: transactionsError
  } = {}
}) {
  return {
    requesting,
    requested,
    data,
    error,
    transactionsRequesting,
    transactionsRequested,
    transactionsData,
    transactionsError
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...currentVersionActions, ...transactionsLogActions }, dispatch)
  };
}

export default connect({
  mapStateToProps,
  mapDispatchToProps,
  titleKey: "currentVersion.title",
  actionType: CURRENT_VERSION_PAGE,
  loadData: ({ match, actions: { doLoadCurrentVersionData, doLoadTransactionsLogData } }) => {
    let {
      params: { txId }
    } = match;

    let loadPromises = [doLoadCurrentVersionData()];
    if (txId) {
      loadPromises.push(doLoadTransactionsLogData());
    }

    return Promise.all(loadPromises);
  }
})(CurrentVersionPage);
