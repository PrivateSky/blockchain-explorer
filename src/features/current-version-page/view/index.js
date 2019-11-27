import React from "react";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { intlShape } from "react-intl";
import Paper from "@material-ui/core/Paper";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import BaseComponent from "components/base-component";
import AssetTypeListView from "./asset-type-list-view";
import AssetTypeView from "./asset-type-view";

const styles = theme => ({
  content: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    height: "100vh"
  },
  dataContent: {
    overflowX: "hidden",
    overflowY: "auto",
    flexGrow: 1
  },
  breadcrumbsContainer: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    margin: `${theme.spacing.unit}px 0 ${theme.spacing.unit * 2}px 0`
  },
  transactionContainer: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    margin: `${theme.spacing.unit}px 0 ${theme.spacing.unit * 2}px 0`
  },
  transaction: {
    fontWeight: "bold"
  }
});

class CurrentVersionTab extends BaseComponent {
  render() {
    let {
      classes,
      intl: { formatMessage },
      assetType,
      assetId,
      txId,
      data,
      transactionsData
    } = this.props;

    let showAssetTypes = !assetType;

    let breadcrumbs = (
      <div>
        <Paper className={classes.breadcrumbsContainer}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} arial-label="Breadcrumb">
            <Link to="/current-version">
              <Typography variant="subtitle1">{formatMessage({ id: "currentVersion.assstTypes" })}</Typography>
            </Link>
            {!showAssetTypes && <Typography variant="subtitle1">{assetType}</Typography>}
          </Breadcrumbs>
        </Paper>

        {!showAssetTypes &&
          !!txId && (
            <Paper className={classes.transactionContainer}>
              <Typography variant="subtitle1">
                {formatMessage({ id: "currentVersion.prefix" })} <span className={classes.transaction}>{txId}</span>
              </Typography>
            </Paper>
          )}
      </div>
    );

    let dataContent;
    if (showAssetTypes) {
      let assetTypes = data.assetTypes.map(x => ({ name: x.name }));
      dataContent = <AssetTypeListView assetTypes={assetTypes} />;
    } else {
      let assetTypeData = data.assetTypes.find(x => x.name === assetType);
      if (!assetTypeData) return <Redirect to="/current-version" />;

      let assetData;
      if (txId) {
        let selectedTransaction = transactionsData.find(x => x.txId === txId);
        if (selectedTransaction) {
          let output = (selectedTransaction.data[txId] || {}).output;
          let assetKeyToSearchFor = `${assetType}/${assetId}`;

          Object.keys(output).forEach(assetKey => {
            if (assetKey.endsWith(assetKeyToSearchFor)) {
              assetData = output[assetKey];
            }
          });
        }
      }

      dataContent = <AssetTypeView assetType={assetTypeData} assetId={assetId} assetData={assetData} />;
    }

    return (
      <div className={classes.content}>
        {breadcrumbs}
        <div className={classes.dataContent}>{dataContent}</div>
      </div>
    );
  }
}

CurrentVersionTab.propTypes = {
  classes: PropTypes.object.isRequired,
  assetType: PropTypes.string,
  assetId: PropTypes.string,
  txId: PropTypes.string,
  intl: intlShape.isRequired,
  requesting: PropTypes.bool,
  requested: PropTypes.bool,
  data: PropTypes.object,
  transactionsData: PropTypes.array,
  error: PropTypes.object
};

CurrentVersionTab.defaultProps = {
  transactionsData: []
};

export default withStyles(styles)(CurrentVersionTab);
