import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import ReactJson from "react-json-view";
import { withStyles } from "@material-ui/core/styles";
import { intlShape } from "react-intl";
import Paper from "@material-ui/core/Paper";
import Pagination from "material-ui-flat-pagination";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import NotesIcon from "@material-ui/icons/Notes";

import BaseComponent from "components/base-component";
import TransactionDetails from "./transaction-details";

const reactJsonConfig = {
  name: false,
  displayDataTypes: false
};

const PAGE_SIZE = 20;
const ASSET_TYPE_EXTRACTION_REGEX = /^[\w\d]*.([\d\w]*)\/([\d\w]*)$/;

const styles = theme => ({
  content: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    height: "100vh",
    [theme.breakpoints.down("sm")]: {
      overflow: "auto",
      display: "block"
    }
  },
  defaultSpacing: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    margin: `${theme.spacing.unit}px 0 ${theme.spacing.unit * 2}px 0`
  },
  topSide: {
    flex: "0 0 auto",
    display: "flex",
    flexDirection: "column"
  },
  headerInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    }
  },
  paginationContainer: {
    display: "flex"
  },
  bottomSide: {
    overflowY: "auto",
    flexGrow: 1,
    display: "flex",
    flexDirection: "row"
  },
  leftSide: {
    height: "100%",
    overflowX: "auto",
    flexBasis: "45%",
    [theme.breakpoints.down("sm")]: {
      flexBasis: "100%"
    }
  },
  txListItem: {
    flex: "0 1 auto"
  },
  rightSide: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: "auto",
    marginLeft: `${2 * theme.spacing.unit}px`,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0
    }
  },
  rightSideTop: {
    display: "block",
    [theme.breakpoints.down("sm")]: {
      overflow: "visible",
      height: "auto"
    }
  },
  rightSideTopDetails: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    }
  },
  rightSideTopFull: {
    flexBasis: "100%"
  },
  viewSourceButtonRoot: {
    alignSelf: "flex-start"
  },
  viewSourceButtonLabel: {
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "row"
    }
  },
  rightSideBottom: {
    flexBasis: "auto",
    marginTop: `${2 * theme.spacing.unit}px`,
    padding: `${2 * theme.spacing.unit}px ${2 * theme.spacing.unit}px`,
    "& > div": {
      overflowX: "auto"
    }
  },
  hideOnSmall: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  showOnSmall: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class TransactionsLogTab extends BaseComponent {
  state = {
    transactionsOffset: 0,
    selectedTransactionId: undefined,
    selectedTransaction: undefined,
    showSource: false
  };

  componentInitialised() {
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleTransactionClick = this.handleTransactionClick.bind(this);
    this.handleDeselectTransaction = this.handleDeselectTransaction.bind(this);
    this.handleViewSource = this.handleViewSource.bind(this);
  }

  handlePageClick(transactionsOffset) {
    this.setState({ transactionsOffset, selectedTransactionId: "", selectedTransaction: undefined });
  }

  handleTransactionClick(txId) {
    return () => {
      let { data = [] } = this.props;
      let selectedTransaction = data.find(x => x.txId === txId);
      this.setState({ selectedTransactionId: txId, selectedTransaction });
    };
  }

  handleDeselectTransaction() {
    this.setState({ selectedTransactionId: "", selectedTransaction: undefined });
  }

  handleViewSource() {
    this.setState(state => ({
      showSource: !state.showSource
    }));
  }

  getTransactionInfo(transaction) {
    let txId = transaction.txId;

    let assetTypes = {};
    let assets = [];

    let txOutput = (transaction.data[txId] || {}).output;
    Object.keys(txOutput).forEach(key => {
      if (key.endsWith("/aliases")) return;

      let keyDataExtraction = ASSET_TYPE_EXTRACTION_REGEX.exec(key);
      let assetType = keyDataExtraction[1];
      let assetId = keyDataExtraction[2];

      assetTypes[assetType] = true;
      assets.push({
        id: assetId,
        type: assetType
      });
    });

    let modifiedAssetsCount = assets.length;
    let modifiedAssetTypesCount = Object.keys(assetTypes).length;

    return {
      txId,
      modifiedAssetsCount,
      modifiedAssetTypesCount,
      assets
    };
  }

  render() {
    let { transactionsOffset, selectedTransactionId, selectedTransaction, showSource } = this.state;
    let {
      classes,
      intl: { formatMessage },
      data,
      latestTransaction
    } = this.props;

    let content;

    if (!data.length) {
      return formatMessage({ id: "transactionsLog.noData" });
    }

    let visibleTransactions = data.slice(transactionsOffset, transactionsOffset + PAGE_SIZE);

    let transactionSection = (
      <List component="nav">
        {visibleTransactions.map(({ txId }) => {
          return (
            <ListItem
              key={txId}
              button
              selected={txId == selectedTransactionId}
              onClick={this.handleTransactionClick(txId)}
            >
              <ListItemIcon>
                <NotesIcon />
              </ListItemIcon>
              <ListItemText primary={txId} className={classes.txListItem} />
            </ListItem>
          );
        })}
      </List>
    );

    let transactionDetailsSection;
    let transactionJsonSection;

    if (selectedTransaction) {
      let transactionInfo = this.getTransactionInfo(selectedTransaction);

      transactionDetailsSection = (
        <TransactionDetails
          className={classnames(classes.rightSideTop, { [classes.rightSideTopFull]: !showSource })}
          {...transactionInfo}
          onDeselectTransaction={this.handleDeselectTransaction}
          onViewSource={this.handleViewSource}
        />
      );

      transactionJsonSection = (
        <Paper className={classes.rightSideBottom}>
          <ReactJson {...reactJsonConfig} src={selectedTransaction.data} />
        </Paper>
      );
    }

    content = (
      <div className={classes.content}>
        <div className={classes.topSide}>
          <Paper className={classnames(classes.headerInfo, classes.defaultSpacing)}>
            <Typography>{`${formatMessage({ id: "transactionsLog.lastTx" })} ${latestTransaction.txId}`}</Typography>
            <Typography>{`${formatMessage({ id: "transactionsLog.txCount" })}  ${data.length}`}</Typography>
            <Typography>{`${formatMessage({ id: "transactionsLog.nrPulses" })}  ${
              latestTransaction.data.currentPulse
            }`}</Typography>
          </Paper>
        </div>

        <Paper className={classnames(classes.defaultSpacing, classes.paginationContainer)}>
          <Typography variant="h5">{formatMessage({ id: "common.tx" })} </Typography>

          <Pagination
            limit={PAGE_SIZE}
            offset={transactionsOffset}
            total={data.length}
            currentPageColor={"default"}
            onClick={(e, offset) => this.handlePageClick(offset)}
          />
        </Paper>

        <div className={classes.bottomSide}>
          <Paper className={classnames(classes.leftSide, { [classes.hideOnSmall]: !!selectedTransaction })}>
            {transactionSection}
          </Paper>

          <div className={classes.rightSide}>
            {transactionDetailsSection}
            {showSource && transactionJsonSection}
          </div>
        </div>
      </div>
    );

    return content;
  }
}

TransactionsLogTab.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  requesting: PropTypes.bool,
  intl: intlShape.isRequired,
  requested: PropTypes.bool,
  data: PropTypes.array,
  latestTransaction: PropTypes.object,
  error: PropTypes.object
};

export default withStyles(styles)(TransactionsLogTab);
