import React from "react";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";
import connect from "core/app-connect";
import classnames from "classnames";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { intlShape } from "react-intl";
import NotesIcon from "@material-ui/icons/Notes";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import BallotIcon from "@material-ui/icons/Ballot";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import BaseComponent from "components/base-component";
import history from "core/history";

const reactJsonConfig = {
  name: false,
  displayDataTypes: false
};

const styles = theme => ({
  container: {
    height: "100%",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      overflow: "visible",
      height: "auto"
    }
  },
  leftSide: {
    height: "100%",
    overflowX: "auto",
    overflowY: "auto",
    flexBasis: "40%",
    [theme.breakpoints.down("sm")]: {
      flexBasis: "100%"
    }
  },
  assetListItem: {
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
  rightSideTopNav: {
    marginBottom: `${2 * theme.spacing.unit}px`
  },
  rightSideTopDetails: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    }
  },
  margin: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
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
    padding: `${2 * theme.spacing.unit}px ${2 * theme.spacing.unit}px`
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

class AssetTypeView extends BaseComponent {
  state = {
    selectedAssetId: "",
    showSource: false,
    ignoreSelectedAsset: false
  };

  static getDerivedStateFromProps({ assetId }, { selectedAssetId }) {
    let state = {};
    if (selectedAssetId != assetId) {
      state.ignoreSelectedAsset = false;
    }

    return state;
  }

  componentInitialised() {
    this.handleAssetClick = this.handleAssetClick.bind(this);
    this.handleViewSource = this.handleViewSource.bind(this);
    this.handleDeselectAsset = this.handleDeselectAsset.bind(this);
  }

  handleAssetClick(assetId) {
    return () => {
      history.push(`/current-version/${this.props.assetType.name}/${assetId}`);
    };
  }

  handleViewSource() {
    this.setState(state => ({
      showSource: !state.showSource
    }));
  }

  handleDeselectAsset() {
    // this.setState({ selectedAssetId: "", ignoreSelectedAsset: true });
    history.push(`/current-version/${this.props.assetType.name}`);
  }

  render() {
    let { showSource, ignoreSelectedAsset } = this.state;
    let {
      classes,
      assetType,
      assetId,
      assetData,
      intl: { formatMessage }
    } = this.props;

    let assets = assetType.assets || [];

    let assetSection = (
      <List component="nav">
        {assets.map((asset, idx) => {
          return (
            <ListItem key={idx} button selected={asset.id === assetId} onClick={this.handleAssetClick(asset.id)}>
              <ListItemIcon>
                <NotesIcon />
              </ListItemIcon>
              <ListItemText
                className={classes.assetListItem}
                primaryTypographyProps={{ align: "left" }}
                secondary={asset.alias}
              >
                <Typography variant="subtitle1"> {asset.id}</Typography>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    );

    let selectedAsset;
    if (!ignoreSelectedAsset) {
      if (assetData) {
        selectedAsset = assetData;
      } else {
        selectedAsset = (assets.find(x => x.id === assetId) || {}).data;
      }
    }

    let assetDetailsSection;
    let assetJsonSection;

    if (selectedAsset) {
      let assetPublicVars = selectedAsset.publicVars || {};
      let publicVarKeys = Object.keys(assetPublicVars).sort();

      assetDetailsSection = (
        <div className={classnames(classes.rightSideTop, { [classes.rightSideTopFull]: !showSource })}>
          <Paper className={classnames(classes.rightSideTopNav, classes.showOnSmall)}>
            <Typography variant="subtitle1" className={classes.margin}>
              {formatMessage({ id: "common.asset" })}
              {assetId}
            </Typography>
            <Fab
              variant="extended"
              color="primary"
              aria-label="Back"
              className={classes.margin}
              onClick={this.handleDeselectAsset}
            >
              <ArrowBackIosIcon className={classes.extendedIcon} />
              {formatMessage({ id: "common.back" })}
            </Fab>
          </Paper>

          <Paper className={classes.rightSideTopDetails}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{formatMessage({ id: "common.name" })}</TableCell>
                  <TableCell>{formatMessage({ id: "common.value" })}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {publicVarKeys.map(varKey => (
                  <TableRow key={varKey}>
                    <TableCell>{varKey}</TableCell>
                    <TableCell>
                      {typeof assetPublicVars[varKey] === "object"
                        ? JSON.stringify(assetPublicVars[varKey])
                        : assetPublicVars[varKey]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Button
              classes={{ root: classes.viewSourceButtonRoot, label: classes.viewSourceButtonLabel }}
              color="primary"
              onClick={this.handleViewSource}
            >
              <BallotIcon className={classes.viewSourceIcon} />
              {formatMessage({ id: "common.source" })}
            </Button>
          </Paper>
        </div>
      );

      assetJsonSection = (
        <Paper className={classes.rightSideBottom}>
          <ReactJson {...reactJsonConfig} src={selectedAsset} />
        </Paper>
      );
    }

    return (
      <div className={classes.container}>
        <Paper className={classnames(classes.leftSide, { [classes.hideOnSmall]: !!selectedAsset })}>
          {assetSection}
        </Paper>
        <div className={classes.rightSide}>
          {assetDetailsSection}
          {showSource && assetJsonSection}
        </div>
      </div>
    );
  }
}

AssetTypeView.propTypes = {
  classes: PropTypes.object.isRequired,
  assetType: PropTypes.object.isRequired,
  assetId: PropTypes.string,
  assetData: PropTypes.object,
  intl: intlShape.isRequired
};

export default connect({ styles })(AssetTypeView);
