import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import connect from "core/app-connect";
import { intlShape } from "react-intl";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import BallotIcon from "@material-ui/icons/Ballot";
import Fab from "@material-ui/core/Fab";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const styles = theme => ({
  topNav: {
    marginBottom: `${2 * theme.spacing.unit}px`
  },
  showOnSmall: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  margin: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  txListItem: {
    flex: "0 1 auto"
  },
  countInfoSection: {
    display: "flex",
    flexDirection: "row"
  },
  countInfoContainer: {
    flex: "1 0 auto"
  },
  viewSourceButtonRoot: {
    alignSelf: "flex-start",
    flex: "0 1 auto"
  },
  viewSourceButtonLabel: {
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "row"
    }
  }
});

const TransactionDetails = ({
  classes,
  intl: { formatMessage },
  className,
  txId,
  modifiedAssetsCount,
  modifiedAssetTypesCount,
  assets,
  onDeselectTransaction,
  onViewSource
}) => {
  return (
    <div className={className}>
      <Fab
        variant="extended"
        color="primary"
        aria-label="Back"
        className={classnames(classes.topNav, classes.margin, classes.showOnSmall)}
        onClick={onDeselectTransaction}
      >
        <ArrowBackIosIcon className={classes.extendedIcon} />
        {formatMessage({ id: "common.back" })}
      </Fab>

      <Paper className={classes.rightSideTopDetails}>
        <Typography variant="subtitle1" className={classes.margin}>
          {formatMessage({ id: "transactionsLog.digest" })}
          {txId}
        </Typography>

        <Divider />

        <div className={classes.countInfoSection}>
          <List className={classes.countInfoContainer}>
            <ListItem>
              <ListItemText
                className={classes.txListItem}
                primary={`${formatMessage({ id: "transactionsLog.assetsModified" })} ${modifiedAssetsCount}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                className={classes.txListItem}
                primary={`${formatMessage({ id: "transactionsLog.assetsTypesModified" })} ${modifiedAssetTypesCount}`}
              />
            </ListItem>
          </List>

          <Button
            classes={{ root: classes.viewSourceButtonRoot, label: classes.viewSourceButtonLabel }}
            color="primary"
            onClick={onViewSource}
          >
            <BallotIcon />
            {formatMessage({ id: "common.source" })}
          </Button>
        </div>

        <Divider />

        {!!assets.length && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{formatMessage({ id: "common.assets" })}</TableCell>
                <TableCell>{formatMessage({ id: "common.actions" })}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assets.map((asset, idx) => (
                <TableRow key={idx}>
                  <TableCell>{asset.id}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      className={classes.margin}
                      component={Link}
                      to={`/current-version/${asset.type}/${asset.id}`}
                    >
                      {formatMessage({ id: "common.actions" })}
                    </Button>

                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      className={classes.margin}
                      component={Link}
                      to={`/current-version/${asset.type}/${asset.id}/${txId}`}
                    >
                      {formatMessage({ id: "common.lastState" })}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </div>
  );
};

TransactionDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  txId: PropTypes.string,
  modifiedAssetsCount: PropTypes.number,
  modifiedAssetTypesCount: PropTypes.number,
  assets: PropTypes.array,
  intl: intlShape.isRequired,
  onDeselectTransaction: PropTypes.func.isRequired,
  onViewSource: PropTypes.func.isRequired
};

TransactionDetails.defaultProps = {
  txId: "-",
  modifiedAssetsCount: 0,
  modifiedAssetTypesCount: 0,
  assets: []
};

export default connect({ styles })(TransactionDetails);
